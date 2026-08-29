export const FOOD_REFERENCE = {
  occasions: ['breakfast','brunch','lunch','dinner','date_night','family_meal','friends','business_meal','quick_bite','special_occasion'],
  cuisines: ['moroccan','italian','french','lebanese','turkish','japanese','chinese','thai','indian','mexican','american','mediterranean','seafood','steakhouse','burger','pizza','pasta','healthy'],
  foods: ['beef','lamb','chicken','turkey','fish','seafood','eggs','cheese','rice','pasta','pizza','burger','salad','vegetables','soup','sandwich','dessert'],
  flavors: ['grilled','spicy','creamy','fresh','citrus','sweet_savory','smoky','savory','rich','light','tangy','umami'],
  textures: ['crispy','crunchy','tender','juicy','creamy','soft','chewy','flaky'],
  spicyLevels: ['none','mild','medium','hot','very_hot'],
  portionSizes: ['snack','light','regular','large','sharing'],
  atmospheres: ['family','romantic','quiet','lively','casual','elegant','fast','view','outdoor','food_first'],
  serviceModes: ['dine_in','delivery','pickup','takeaway'],
  dietary: ['halal','vegetarian','vegan','gluten_free','lactose_free','low_carb','high_protein','healthy'],
  allergens: ['peanuts','tree_nuts','milk','gluten','shellfish','fish','eggs','soy','sesame'],
  priorities: ['food_quality','service','atmosphere','price_value','distance','speed','health','novelty','popularity']
};

export const DARJA_CANONICAL = {
  'لحم': { favorite_foods: ['beef'] },
  'دجاج': { favorite_foods: ['chicken'] },
  'باستا': { favorite_foods: ['pasta'] },
  'بيتزا': { favorite_foods: ['pizza'] },
  'حوت': { favorite_foods: ['fish'] },
  'مشوي': { favorite_flavors: ['grilled'] },
  'حار': { favorite_flavors: ['spicy'] },
  'كريمي': { favorite_flavors: ['creamy'] },
  'خفيف': { favorite_flavors: ['light'] },
  'منعش': { favorite_flavors: ['fresh'] },
  'حلو ومالح': { favorite_flavors: ['sweet_savory'] },
  'رومانسي': { preferred_atmosphere: ['romantic'], preferred_occasions: ['date_night'] },
  'عائلي': { preferred_atmosphere: ['family'], preferred_occasions: ['family_meal'] },
  'هادئ': { preferred_atmosphere: ['quiet'] },
  'منظر زوين': { preferred_atmosphere: ['view'] },
  'سريع': { preferred_atmosphere: ['fast'], service_priorities: ['speed'] },
  'فطور': { preferred_occasions: ['breakfast'] },
  'غداء': { preferred_occasions: ['lunch'] },
  'عشاء': { preferred_occasions: ['dinner'] },
  'عشاء رومانسي': { preferred_occasions: ['dinner','date_night'], preferred_atmosphere: ['romantic'] }
};

export const RESEARCH_GUIDANCE = {
  restaurantChoiceCore: ['food_quality','service','atmosphere','price_value'],
  foodChoiceCore: ['sensory_preference','ingredients','price','context','personal_constraints','social_context'],
  safetyRule: 'Allergies are hard filters and must never be inferred.',
  imageRule: 'Only use a dish photo as a real recommendation image when it is tied to that exact dish/restaurant and the data source is trusted or verified.',
  rankingRule: 'Use structured factual data for prices, ingredients, allergens, availability and photos; use AI to understand intent and explain matches.'
};

export function referenceSummary() {
  return JSON.stringify({ FOOD_REFERENCE, RESEARCH_GUIDANCE });
}
