const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const norm = (values = []) => values.map((v) => String(v).trim().toLowerCase()).filter(Boolean);
const overlapRatio = (wanted = [], actual = []) => {
  const w = norm(wanted);
  if (!w.length) return 0.5;
  const set = new Set(norm(actual));
  const matches = w.filter((v) => set.has(v)).length;
  return matches / w.length;
};

export function hasAllergyConflict(profile, dish) {
  const allergies = new Set(norm(profile.allergies || []));
  return norm(dish.allergens || []).some((v) => allergies.has(v));
}

export function scoreDish({ profile, dish, restaurant, distanceKm = null, feedbackSignal = 0 }) {
  if (!dish?.available || !restaurant?.active) return null;
  if (hasAllergyConflict(profile, dish)) return null;

  const tasteSignals = [
    ...(dish.food_tags || []),
    ...(dish.flavor_tags || []),
    ...(dish.main_ingredients || []),
    ...(dish.texture_tags || [])
  ];
  const wanted = [
    ...(profile.favorite_foods || []),
    ...(profile.favorite_flavors || []),
    ...(profile.preferred_textures || [])
  ];
  const disliked = new Set(norm(profile.disliked_foods || []));
  if (norm(tasteSignals).some((v) => disliked.has(v))) return null;

  const taste = overlapRatio(wanted, tasteSignals) * 34;
  const cuisine = overlapRatio(profile.preferred_cuisines || [], restaurant.cuisine_types || []) * 12;
  const atmosphere = overlapRatio(profile.preferred_atmosphere || [], restaurant.atmosphere_tags || []) * 10;
  const service = overlapRatio(profile.preferred_service_modes || [], restaurant.service_modes || []) * 6;
  const portion = overlapRatio(profile.portion_preferences || [], dish.portion_size ? [dish.portion_size] : []) * 4;

  let budget = 8;
  if (profile.budget_max != null && dish.price != null) {
    if (Number(dish.price) <= Number(profile.budget_max)) budget = 16;
    else if (Number(dish.price) <= Number(profile.budget_max) * 1.1) budget = 6;
    else budget = 0;
  }

  let distance = 6;
  if (distanceKm != null) {
    const max = Number(profile.max_distance_km || 10);
    distance = clamp((1 - Number(distanceKm) / Math.max(max, 0.1)) * 10, 0, 10);
  }

  const feedback = clamp(4 + Number(feedbackSignal || 0) * 4, 0, 8);
  const raw = taste + cuisine + atmosphere + service + portion + budget + distance + feedback;
  const confidenceFactor = dish.data_confidence === 'verified' ? 1 : dish.data_confidence === 'partial' ? 0.92 : 0.78;
  const score = Math.round(clamp(raw * confidenceFactor, 0, 100));

  return {
    score,
    breakdown: {
      taste: Math.round(taste),
      cuisine: Math.round(cuisine),
      atmosphere: Math.round(atmosphere),
      service: Math.round(service),
      portion: Math.round(portion),
      budget: Math.round(budget),
      distance: Math.round(distance),
      feedback: Math.round(feedback),
      data_confidence: dish.data_confidence || 'unknown'
    }
  };
}

export function rankDishes(items, context) {
  return items
    .map((item) => ({ ...item, match: scoreDish({ ...context, ...item }) }))
    .filter((item) => item.match)
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 3);
}
