import pg from 'pg';

const { Pool } = pg;

export const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
    })
  : null;

function requirePool() {
  if (!pool) throw new Error('DATABASE_URL is not configured');
  return pool;
}

export async function getOrCreateUser(whatsappNumber, name = null) {
  const db = requirePool();
  const { rows } = await db.query(
    `INSERT INTO users (whatsapp_number, name)
     VALUES ($1, $2)
     ON CONFLICT (whatsapp_number)
     DO UPDATE SET name = COALESCE(EXCLUDED.name, users.name), updated_at = NOW()
     RETURNING *`,
    [whatsappNumber, name]
  );

  const user = rows[0];
  await db.query(
    `INSERT INTO taste_profiles (user_id) VALUES ($1)
     ON CONFLICT (user_id) DO NOTHING`,
    [user.id]
  );
  await db.query(
    `INSERT INTO conversation_state (user_id) VALUES ($1)
     ON CONFLICT (user_id) DO NOTHING`,
    [user.id]
  );
  return user;
}

export async function getTasteProfile(userId) {
  const { rows } = await requirePool().query(
    'SELECT * FROM taste_profiles WHERE user_id = $1',
    [userId]
  );
  return rows[0] || null;
}

export async function getConversationState(userId) {
  const { rows } = await requirePool().query(
    'SELECT * FROM conversation_state WHERE user_id = $1',
    [userId]
  );
  return rows[0] || null;
}

export async function resetPreferenceSurvey(userId, rawMessage = null) {
  const db = requirePool();
  await db.query(
    `UPDATE taste_profiles SET
      favorite_foods='{}', favorite_flavors='{}', disliked_foods='{}',
      budget_min=NULL, budget_max=NULL, preferred_atmosphere='{}',
      preferred_cuisines='{}', preferred_textures='{}', preferred_occasions='{}',
      preferred_service_modes='{}', service_priorities='{}', portion_preferences='{}',
      spicy_preference=NULL, health_priority=NULL, confidence_score=0, updated_at=NOW()
     WHERE user_id=$1`,
    [userId]
  );
  const missing = ['food', 'flavor', 'dislikes', 'budget', 'atmosphere'];
  await db.query(
    `UPDATE conversation_state
     SET missing_preferences=$2, current_step='food', last_message=$3, updated_at=NOW()
     WHERE user_id=$1`,
    [userId, missing, rawMessage]
  );
  return { missing_preferences: missing, current_step: 'food' };
}

export async function applyTasteUpdate(userId, patch, rawMessage = null) {
  const profile = await getTasteProfile(userId);
  const state = await getConversationState(userId);
  if (!profile || !state) throw new Error('User profile/state not initialized');

  const merged = {
    favorite_foods: uniq([...(profile.favorite_foods || []), ...(patch.favorite_foods || [])]),
    favorite_flavors: uniq([...(profile.favorite_flavors || []), ...(patch.favorite_flavors || [])]),
    disliked_foods: uniq([...(profile.disliked_foods || []), ...(patch.disliked_foods || [])]),
    allergies: uniq([...(profile.allergies || []), ...(patch.allergies || [])]),
    dietary_restrictions: uniq([...(profile.dietary_restrictions || []), ...(patch.dietary_restrictions || [])]),
    preferred_atmosphere: uniq([...(profile.preferred_atmosphere || []), ...(patch.preferred_atmosphere || [])]),
    preferred_cuisines: uniq([...(profile.preferred_cuisines || []), ...(patch.preferred_cuisines || [])]),
    preferred_textures: uniq([...(profile.preferred_textures || []), ...(patch.preferred_textures || [])]),
    preferred_occasions: uniq([...(profile.preferred_occasions || []), ...(patch.preferred_occasions || [])]),
    preferred_service_modes: uniq([...(profile.preferred_service_modes || []), ...(patch.preferred_service_modes || [])]),
    service_priorities: uniq([...(profile.service_priorities || []), ...(patch.service_priorities || [])]),
    portion_preferences: uniq([...(profile.portion_preferences || []), ...(patch.portion_preferences || [])]),
    spicy_preference: patch.spicy_preference ?? profile.spicy_preference,
    health_priority: patch.health_priority ?? profile.health_priority,
    budget_min: patch.budget_min ?? profile.budget_min,
    budget_max: patch.budget_max ?? profile.budget_max,
    max_distance_km: patch.max_distance_km ?? profile.max_distance_km,
    confidence_score: Math.max(Number(profile.confidence_score || 0), Number(patch.confidence_score || 0))
  };

  await requirePool().query(
    `UPDATE taste_profiles SET
      favorite_foods=$2, favorite_flavors=$3, disliked_foods=$4, allergies=$5,
      dietary_restrictions=$6, budget_min=$7, budget_max=$8,
      preferred_atmosphere=$9, max_distance_km=$10, confidence_score=$11,
      preferred_cuisines=$12, preferred_textures=$13, preferred_occasions=$14,
      preferred_service_modes=$15, service_priorities=$16, portion_preferences=$17,
      spicy_preference=$18, health_priority=$19, updated_at=NOW()
     WHERE user_id=$1`,
    [
      userId,
      merged.favorite_foods,
      merged.favorite_flavors,
      merged.disliked_foods,
      merged.allergies,
      merged.dietary_restrictions,
      merged.budget_min,
      merged.budget_max,
      merged.preferred_atmosphere,
      merged.max_distance_km,
      merged.confidence_score,
      merged.preferred_cuisines,
      merged.preferred_textures,
      merged.preferred_occasions,
      merged.preferred_service_modes,
      merged.service_priorities,
      merged.portion_preferences,
      merged.spicy_preference,
      merged.health_priority
    ]
  );

  const captured = new Set(['allergies']);
  if (patch.food_answered || merged.favorite_foods.length) captured.add('food');
  if (patch.flavor_answered || merged.favorite_flavors.length) captured.add('flavor');
  if (patch.dislikes_answered || merged.disliked_foods.length) captured.add('dislikes');
  if (merged.budget_min != null || merged.budget_max != null || patch.budget_answered) captured.add('budget');
  if (merged.preferred_atmosphere.length || patch.atmosphere_answered) captured.add('atmosphere');

  const missing = (state.missing_preferences || []).filter((item) => !captured.has(item) && item !== 'allergies');
  await requirePool().query(
    `UPDATE conversation_state
     SET missing_preferences=$2, current_step=$3, last_message=$4, updated_at=NOW()
     WHERE user_id=$1`,
    [userId, missing, missing[0] || 'complete', rawMessage]
  );

  return { profile: merged, missing_preferences: missing };
}

export async function listCandidateDishes() {
  const { rows } = await requirePool().query(
    `SELECT d.*, r.name AS restaurant_name, r.city AS restaurant_city, r.latitude, r.longitude,
            r.cuisine_types, r.atmosphere_tags, r.rating, r.review_count,
            r.map_url, r.active, r.service_modes, r.service_tags, r.price_level,
            r.cover_photo_url
     FROM dishes d
     JOIN restaurants r ON r.id = d.restaurant_id
     WHERE d.available = TRUE AND r.active = TRUE`
  );
  return rows;
}

function uniq(items) {
  return [...new Set(items.filter(Boolean).map((v) => String(v).trim().toLowerCase()))];
}
