import { URL } from 'node:url';
import pg from 'pg';

const { Pool } = pg;

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
    })
  : null;

function requirePool() {
  if (!pool) throw new Error('DATABASE_URL is not configured');
  return pool;
}

function uniq(items = []) {
  return [...new Set(items.filter(Boolean).map((v) => String(v).trim()))];
}

function normalizeUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (!/^https?:$/.test(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function confidenceForSource(source = {}) {
  const type = String(source.type || '').toLowerCase();
  if (['official_website', 'official_instagram', 'official_facebook', 'restaurant_menu'].includes(type)) return 'verified';
  if (['google_maps', 'tripadvisor', 'booking_directory'].includes(type)) return 'partial';
  return 'unknown';
}

function bestConfidence(values = []) {
  if (values.includes('verified')) return 'verified';
  if (values.includes('partial')) return 'partial';
  return 'unknown';
}

export async function importRestaurantRecord(input = {}) {
  const db = requirePool();
  const name = String(input.name || '').trim();
  if (!name) throw new Error('restaurant name is required');

  const city = String(input.city || 'Casablanca').trim() || 'Casablanca';
  const sources = Array.isArray(input.sources) ? input.sources : [];
  const sourceUrls = uniq(sources.map((s) => normalizeUrl(s.url))).filter(Boolean);
  const sourceConfidence = bestConfidence(sources.map(confidenceForSource));
  const coverPhotoUrl = normalizeUrl(input.cover_photo_url);
  const coverPhotoSourceUrl = normalizeUrl(input.cover_photo_source_url);
  const coverPhotoConfidence = input.cover_photo_confidence || (coverPhotoUrl && coverPhotoSourceUrl ? 'verified' : coverPhotoUrl ? 'partial' : 'unknown');

  const sourceKey = String(input.source_key || `import:${city.toLowerCase()}:${name.toLowerCase()}`).replace(/\s+/g, '-');

  const restaurantResult = await db.query(
    `INSERT INTO restaurants (
      name, address, city, latitude, longitude, cuisine_types, phone, map_url, rating,
      review_count, atmosphere_tags, service_modes, service_tags, price_level,
      cover_photo_url, source_key, source_url, data_confidence, last_verified_at, active
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,TRUE
    )
    ON CONFLICT (source_key) WHERE source_key IS NOT NULL
    DO UPDATE SET
      name=EXCLUDED.name,
      address=COALESCE(EXCLUDED.address, restaurants.address),
      city=EXCLUDED.city,
      latitude=COALESCE(EXCLUDED.latitude, restaurants.latitude),
      longitude=COALESCE(EXCLUDED.longitude, restaurants.longitude),
      cuisine_types=CASE WHEN cardinality(EXCLUDED.cuisine_types) > 0 THEN EXCLUDED.cuisine_types ELSE restaurants.cuisine_types END,
      phone=COALESCE(EXCLUDED.phone, restaurants.phone),
      map_url=COALESCE(EXCLUDED.map_url, restaurants.map_url),
      rating=COALESCE(EXCLUDED.rating, restaurants.rating),
      review_count=COALESCE(EXCLUDED.review_count, restaurants.review_count),
      atmosphere_tags=CASE WHEN cardinality(EXCLUDED.atmosphere_tags) > 0 THEN EXCLUDED.atmosphere_tags ELSE restaurants.atmosphere_tags END,
      service_modes=CASE WHEN cardinality(EXCLUDED.service_modes) > 0 THEN EXCLUDED.service_modes ELSE restaurants.service_modes END,
      service_tags=CASE WHEN cardinality(EXCLUDED.service_tags) > 0 THEN EXCLUDED.service_tags ELSE restaurants.service_tags END,
      price_level=COALESCE(EXCLUDED.price_level, restaurants.price_level),
      cover_photo_url=COALESCE(EXCLUDED.cover_photo_url, restaurants.cover_photo_url),
      source_url=COALESCE(EXCLUDED.source_url, restaurants.source_url),
      data_confidence=EXCLUDED.data_confidence,
      last_verified_at=EXCLUDED.last_verified_at,
      updated_at=NOW()
    RETURNING *`,
    [
      name,
      input.address || null,
      city,
      input.latitude ?? null,
      input.longitude ?? null,
      uniq(input.cuisine_types || []),
      input.phone || null,
      normalizeUrl(input.map_url),
      input.rating ?? null,
      input.review_count ?? null,
      uniq(input.atmosphere_tags || []),
      uniq(input.service_modes || []),
      uniq(input.service_tags || []),
      input.price_level ?? null,
      coverPhotoUrl,
      sourceKey,
      sourceUrls[0] || null,
      sourceConfidence,
      sourceConfidence === 'unknown' ? null : new Date()
    ]
  );

  const restaurant = restaurantResult.rows[0];
  const dishes = [];

  for (const raw of Array.isArray(input.dishes) ? input.dishes : []) {
    const dishName = String(raw.name || '').trim();
    if (!dishName) continue;
    const photoUrl = normalizeUrl(raw.photo_url);
    const photoSourceUrl = normalizeUrl(raw.photo_source_url);
    const imageConfidence = raw.image_confidence || (photoUrl && photoSourceUrl ? 'verified' : photoUrl ? 'partial' : 'unknown');
    const dishSources = Array.isArray(raw.sources) ? raw.sources : [];
    const dishConfidence = bestConfidence(dishSources.map(confidenceForSource));
    const dishSourceKey = String(raw.source_key || `${sourceKey}:dish:${dishName.toLowerCase()}`).replace(/\s+/g, '-');
    const result = await db.query(
      `INSERT INTO dishes (
        restaurant_id, name, description, price, photo_url, main_ingredients, food_tags,
        flavor_tags, allergens, dietary_tags, spicy_level, available, data_confidence,
        last_verified_at, texture_tags, portion_size, calories, protein_grams,
        image_confidence, source_url, source_key
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,TRUE,$12,$13,$14,$15,$16,$17,$18,$19,$20)
      ON CONFLICT (source_key) WHERE source_key IS NOT NULL
      DO UPDATE SET
        description=COALESCE(EXCLUDED.description, dishes.description),
        price=COALESCE(EXCLUDED.price, dishes.price),
        photo_url=COALESCE(EXCLUDED.photo_url, dishes.photo_url),
        main_ingredients=CASE WHEN cardinality(EXCLUDED.main_ingredients)>0 THEN EXCLUDED.main_ingredients ELSE dishes.main_ingredients END,
        food_tags=CASE WHEN cardinality(EXCLUDED.food_tags)>0 THEN EXCLUDED.food_tags ELSE dishes.food_tags END,
        flavor_tags=CASE WHEN cardinality(EXCLUDED.flavor_tags)>0 THEN EXCLUDED.flavor_tags ELSE dishes.flavor_tags END,
        allergens=CASE WHEN cardinality(EXCLUDED.allergens)>0 THEN EXCLUDED.allergens ELSE dishes.allergens END,
        dietary_tags=CASE WHEN cardinality(EXCLUDED.dietary_tags)>0 THEN EXCLUDED.dietary_tags ELSE dishes.dietary_tags END,
        spicy_level=COALESCE(EXCLUDED.spicy_level, dishes.spicy_level),
        data_confidence=EXCLUDED.data_confidence,
        last_verified_at=EXCLUDED.last_verified_at,
        texture_tags=CASE WHEN cardinality(EXCLUDED.texture_tags)>0 THEN EXCLUDED.texture_tags ELSE dishes.texture_tags END,
        portion_size=COALESCE(EXCLUDED.portion_size, dishes.portion_size),
        calories=COALESCE(EXCLUDED.calories, dishes.calories),
        protein_grams=COALESCE(EXCLUDED.protein_grams, dishes.protein_grams),
        image_confidence=EXCLUDED.image_confidence,
        source_url=COALESCE(EXCLUDED.source_url, dishes.source_url),
        updated_at=NOW()
      RETURNING *`,
      [
        restaurant.id,
        dishName,
        raw.description || null,
        raw.price ?? null,
        photoUrl,
        uniq(raw.main_ingredients || []),
        uniq(raw.food_tags || []),
        uniq(raw.flavor_tags || []),
        uniq(raw.allergens || []),
        uniq(raw.dietary_tags || []),
        raw.spicy_level ?? null,
        dishConfidence,
        dishConfidence === 'unknown' ? null : new Date(),
        uniq(raw.texture_tags || []),
        raw.portion_size || null,
        raw.calories ?? null,
        raw.protein_grams ?? null,
        imageConfidence,
        normalizeUrl(raw.source_url) || photoSourceUrl || (dishSources.map((s) => normalizeUrl(s.url)).find(Boolean) || null),
        dishSourceKey
      ]
    );
    dishes.push(result.rows[0]);
  }

  return {
    restaurant,
    dishes,
    sources: sourceUrls,
    cover_photo_confidence: coverPhotoConfidence,
    restaurant_data_confidence: sourceConfidence
  };
}
