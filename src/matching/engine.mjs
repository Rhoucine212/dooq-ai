const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const overlapRatio = (wanted = [], actual = []) => {
  if (!wanted.length) return 0.5;
  const set = new Set(actual.map((v) => String(v).toLowerCase()));
  const matches = wanted.filter((v) => set.has(String(v).toLowerCase())).length;
  return matches / wanted.length;
};

export function hasAllergyConflict(profile, dish) {
  const allergies = new Set((profile.allergies || []).map((v) => String(v).toLowerCase()));
  return (dish.allergens || []).some((v) => allergies.has(String(v).toLowerCase()));
}

export function scoreDish({ profile, dish, restaurant, distanceKm = null, feedbackSignal = 0 }) {
  if (!dish?.available || !restaurant?.active) return null;
  if (hasAllergyConflict(profile, dish)) return null;

  const tasteSignals = [...(dish.food_tags || []), ...(dish.flavor_tags || []), ...(dish.main_ingredients || [])];
  const wanted = [...(profile.favorite_foods || []), ...(profile.favorite_flavors || [])];
  const disliked = new Set((profile.disliked_foods || []).map((v) => String(v).toLowerCase()));
  if (tasteSignals.some((v) => disliked.has(String(v).toLowerCase()))) return null;

  const taste = overlapRatio(wanted, tasteSignals) * 40;

  let budget = 10;
  if (profile.budget_max != null && dish.price != null) {
    if (Number(dish.price) <= Number(profile.budget_max)) budget = 20;
    else if (Number(dish.price) <= Number(profile.budget_max) * 1.1) budget = 8;
    else budget = 0;
  }

  const cuisine = overlapRatio(profile.favorite_foods || [], restaurant.cuisine_types || []) * 15;

  let distance = 7.5;
  if (distanceKm != null) {
    const max = Number(profile.max_distance_km || 10);
    distance = clamp((1 - Number(distanceKm) / Math.max(max, 0.1)) * 15, 0, 15);
  }

  const feedback = clamp(5 + Number(feedbackSignal || 0) * 5, 0, 10);
  const raw = taste + budget + cuisine + distance + feedback;
  const confidenceFactor = dish.data_confidence === 'verified' ? 1 : dish.data_confidence === 'partial' ? 0.93 : 0.82;
  const score = Math.round(clamp(raw * confidenceFactor, 0, 100));

  return {
    score,
    breakdown: {
      taste: Math.round(taste),
      budget: Math.round(budget),
      cuisine: Math.round(cuisine),
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
