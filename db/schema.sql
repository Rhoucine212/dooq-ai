CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number TEXT UNIQUE NOT NULL,
  name TEXT,
  language TEXT NOT NULL DEFAULT 'ary',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS taste_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  favorite_foods TEXT[] NOT NULL DEFAULT '{}',
  favorite_flavors TEXT[] NOT NULL DEFAULT '{}',
  disliked_foods TEXT[] NOT NULL DEFAULT '{}',
  allergies TEXT[] NOT NULL DEFAULT '{}',
  dietary_restrictions TEXT[] NOT NULL DEFAULT '{}',
  budget_min NUMERIC(10,2),
  budget_max NUMERIC(10,2),
  preferred_atmosphere TEXT[] NOT NULL DEFAULT '{}',
  max_distance_km NUMERIC(6,2),
  confidence_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE taste_profiles ADD COLUMN IF NOT EXISTS preferred_cuisines TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE taste_profiles ADD COLUMN IF NOT EXISTS preferred_textures TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE taste_profiles ADD COLUMN IF NOT EXISTS preferred_occasions TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE taste_profiles ADD COLUMN IF NOT EXISTS preferred_service_modes TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE taste_profiles ADD COLUMN IF NOT EXISTS service_priorities TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE taste_profiles ADD COLUMN IF NOT EXISTS portion_preferences TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE taste_profiles ADD COLUMN IF NOT EXISTS spicy_preference TEXT;
ALTER TABLE taste_profiles ADD COLUMN IF NOT EXISTS health_priority SMALLINT CHECK (health_priority BETWEEN 0 AND 5);

CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  cuisine_types TEXT[] NOT NULL DEFAULT '{}',
  phone TEXT,
  map_url TEXT,
  rating NUMERIC(3,2),
  atmosphere_tags TEXT[] NOT NULL DEFAULT '{}',
  opening_hours JSONB NOT NULL DEFAULT '{}'::jsonb,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS cover_photo_url TEXT;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS service_modes TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS service_tags TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS price_level SMALLINT CHECK (price_level BETWEEN 1 AND 4);
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS review_count INTEGER;

CREATE TABLE IF NOT EXISTS dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  photo_url TEXT,
  main_ingredients TEXT[] NOT NULL DEFAULT '{}',
  food_tags TEXT[] NOT NULL DEFAULT '{}',
  flavor_tags TEXT[] NOT NULL DEFAULT '{}',
  allergens TEXT[] NOT NULL DEFAULT '{}',
  dietary_tags TEXT[] NOT NULL DEFAULT '{}',
  spicy_level SMALLINT CHECK (spicy_level BETWEEN 0 AND 5),
  available BOOLEAN NOT NULL DEFAULT TRUE,
  data_confidence TEXT NOT NULL DEFAULT 'partial' CHECK (data_confidence IN ('verified','partial','unknown')),
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE dishes ADD COLUMN IF NOT EXISTS texture_tags TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE dishes ADD COLUMN IF NOT EXISTS portion_size TEXT;
ALTER TABLE dishes ADD COLUMN IF NOT EXISTS calories INTEGER;
ALTER TABLE dishes ADD COLUMN IF NOT EXISTS protein_grams NUMERIC(8,2);
ALTER TABLE dishes ADD COLUMN IF NOT EXISTS image_confidence TEXT NOT NULL DEFAULT 'unknown' CHECK (image_confidence IN ('verified','partial','unknown'));
ALTER TABLE dishes ADD COLUMN IF NOT EXISTS source_url TEXT;

CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dish_id UUID NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
  score NUMERIC(5,2) NOT NULL,
  reason JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dish_id UUID NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('like','dislike')),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversation_state (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  current_step TEXT NOT NULL DEFAULT 'welcome',
  missing_preferences TEXT[] NOT NULL DEFAULT ARRAY['food','flavor','dislikes','allergies','budget','atmosphere'],
  last_message TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dishes_restaurant ON dishes(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_feedback_user ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON recommendations(user_id);
