import test from 'node:test';
import assert from 'node:assert/strict';
import { hasAllergyConflict, scoreDish, rankDishes } from '../src/matching/engine.mjs';

test('allergy conflicts exclude a dish', () => {
  const profile = { allergies: ['nuts'] };
  const dish = { allergens: ['nuts'] };
  assert.equal(hasAllergyConflict(profile, dish), true);
});

test('matching engine scores a suitable dish', () => {
  const profile = {
    favorite_foods: ['chicken'],
    favorite_flavors: ['creamy'],
    disliked_foods: ['fish'],
    allergies: ['nuts'],
    budget_max: 150,
    max_distance_km: 10
  };
  const dish = {
    available: true,
    price: 120,
    food_tags: ['chicken'],
    flavor_tags: ['creamy'],
    main_ingredients: ['chicken','pasta'],
    allergens: [],
    data_confidence: 'verified'
  };
  const restaurant = { active: true, cuisine_types: ['italian'] };
  const result = scoreDish({ profile, dish, restaurant, distanceKm: 1.5, feedbackSignal: 0 });
  assert.ok(result.score > 60);
});

test('rankDishes returns at most three results', () => {
  const profile = { favorite_foods: [], favorite_flavors: [], disliked_foods: [], allergies: [] };
  const restaurant = { active: true, cuisine_types: [] };
  const items = Array.from({ length: 5 }, (_, index) => ({
    dish: { available: true, allergens: [], data_confidence: 'verified', food_tags: [], flavor_tags: [], main_ingredients: [] },
    restaurant,
    distanceKm: index + 1
  }));
  assert.equal(rankDishes(items, { profile }).length, 3);
});
