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
      updated_at=NOW()
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
      merged.confidence_score
    ]
  );

  const captured = new Set();
  if (merged.favorite_foods.length) captured.add('food');
  if (merged.favorite_flavors.length) captured.add('flavor');
  if (patch.dislikes_answered || merged.disliked_foods.length) captured.add('dislikes');
  if (patch.allergies_answered || merged.allergies.length) captured.add('allergies');
  if (merged.budget_min != null || merged.budget_max != null || patch.budget_answered) captured.add('budget');
  if (merged.preferred_atmosphere.length || patch.atmosphere_answered) captured.add('atmosphere');

  const missing = (state.missing_preferences || []).filter((item) => !captured.has(item));
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
    `SELECT d.*, r.name AS restaurant_name, r.latitude, r.longitude,
            r.cuisine_types, r.atmosphere_tags, r.rating, r.map_url, r.active
     FROM dishes d
     JOIN restaurants r ON r.id = d.restaurant_id
     WHERE d.available = TRUE AND r.active = TRUE`
  );
  return rows;
}

function uniq(items) {
  return [...new Set(items.filter(Boolean).map((v) => String(v).trim().toLowerCase()))];
}
