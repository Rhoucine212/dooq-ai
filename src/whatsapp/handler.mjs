import { parseTasteMessage, transcribeAudio } from '../ai/parser.mjs';
import { applyTasteUpdate, getConversationState, getOrCreateUser, getTasteProfile, listCandidateDishes, resetPreferenceSurvey } from '../db.mjs';
import { rankDishes } from '../matching/engine.mjs';
import { onboarding, completionMessage, allergySafetyMessage } from '../onboarding/darija.mjs';
import { downloadMedia, sendImage, sendText } from './meta.mjs';

const stepMap = {
  food: 'welcome', flavor: 'flavor', dislikes: 'dislikes', allergies: 'allergies', budget: 'budget', atmosphere: 'atmosphere'
};

const noPreferencePatterns = [
  'ما عنديش تفضيل', 'ما عنديش تفضيل معين', 'ما عنديش تفاصيل', 'أي حاجة', 'اي حاجة',
  'مش مهم', 'ماشي مهم', 'سؤال مكرر', 'نفس السؤال', 'whatever', 'no preference'
];

const stepValueMaps = {
  flavor: [
    [['مشوي', 'grilled', 'grill'], 'grilled'], [['حار', 'spicy', 'hot'], 'spicy'],
    [['كريمي', 'creamy'], 'creamy'], [['خفيف', 'light'], 'light'],
    [['منعش', 'fresh', 'refreshing'], 'fresh'], [['حلو ومالح', 'sweet and salty', 'sweet salty'], 'sweet_savory']
  ],
  food: [
    [['لحم', 'meat', 'beef'], 'beef'], [['دجاج', 'chicken'], 'chicken'], [['باستا', 'pasta'], 'pasta'],
    [['بيتزا', 'pizza'], 'pizza'], [['حوت', 'سمك', 'fish'], 'fish'], [['خفيفة وصحية', 'صحية', 'healthy'], 'healthy']
  ],
  atmosphere: [
    [['عائلي', 'family'], 'family'], [['رومانسي', 'romantic'], 'romantic'], [['هادئ', 'quiet', 'calm'], 'quiet'],
    [['فيه شوية ديال الجو', 'جو', 'lively'], 'lively'], [['سريع', 'quick', 'fast'], 'fast'],
    [['منظر زوين', 'view', 'scenic'], 'view'], [['الأكل يكون ممتاز', 'الاكل يكون ممتاز', 'food first'], 'food_first']
  ]
};

const genericRestaurantIntents = new Set([
  'مطعم', 'مطاعم', 'restaurant', 'restaurants', 'resto', 'بغيت ناكل', 'اريد ان اكل', 'أريد أن آكل', 'شنو ناكل', 'فين ناكل', 'فين نمشي ناكل'
]);

const bestFollowUpPatterns = [
  'اختار احسن واحد', 'اختار أحسن واحد', 'اختار لي احسن واحد', 'اختار لي أحسن واحد',
  'شنو الاحسن', 'شنو الأحسن', 'شنو افضل واحد', 'شنو أفضل واحد', 'best one', 'choose the best', 'meilleur', 'le meilleur'
];

const mapFollowUpPatterns = [
  'الموقع', 'المكان', 'الخريطة', 'لوكيشن', 'location', 'map', 'google maps', 'فين كاين', 'فين هو',
  'ارسل الموقع', 'أرسل الموقع', 'صيفط الموقع', 'بغيت نمشي ليه', 'باش نمشي ليه'
];

function normalizeText(text = '') {
  return String(text).trim().toLowerCase().replace(/[ًٌٍَُِّْـ]/g, '').replace(/[؟?!.,،؛:]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function isGenericRestaurantIntent(text = '') { return genericRestaurantIntents.has(normalizeText(text)); }
function includesPhrase(text, phrase) { return text === phrase || text.includes(phrase); }

function isRecommendationFollowUp(text = '') {
  const normalized = normalizeText(text);
  return bestFollowUpPatterns.some((p) => includesPhrase(normalized, normalizeText(p)))
    || mapFollowUpPatterns.some((p) => includesPhrase(normalized, normalizeText(p)));
}

function googleMapsSearchUrl(name, city) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([name, city].filter(Boolean).join(' '))}`;
}

function instagramSearchUrl(name, city) {
  return `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent([name, city].filter(Boolean).join(' '))}`;
}

function googleImageSearchUrl(dishName) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${dishName} food dish`)}`;
}

function restaurantLinks(restaurant) {
  const city = restaurant.city || 'Casablanca';
  return {
    map: restaurant.map_url || googleMapsSearchUrl(restaurant.name, city),
    instagram: instagramSearchUrl(restaurant.name, city)
  };
}

function applyDeterministicStepReply(patch, text, currentStep) {
  const normalized = normalizeText(text);
  if (!normalized || !currentStep) return patch;
  const out = {
    ...patch,
    favorite_foods: [...(patch.favorite_foods || [])],
    favorite_flavors: [...(patch.favorite_flavors || [])],
    preferred_atmosphere: [...(patch.preferred_atmosphere || [])]
  };
  if (noPreferencePatterns.some((p) => includesPhrase(normalized, normalizeText(p)))) {
    if (currentStep === 'food') out.food_answered = true;
    if (currentStep === 'flavor') out.flavor_answered = true;
    if (currentStep === 'dislikes') out.dislikes_answered = true;
    if (currentStep === 'allergies') out.allergies_answered = true;
    if (currentStep === 'budget') out.budget_answered = true;
    if (currentStep === 'atmosphere') out.atmosphere_answered = true;
    return out;
  }
  const mappings = stepValueMaps[currentStep] || [];
  for (const [phrases, value] of mappings) {
    if (!phrases.some((p) => includesPhrase(normalized, normalizeText(p)))) continue;
    if (currentStep === 'food') { out.favorite_foods = [...new Set([...out.favorite_foods, value])]; out.food_answered = true; }
    if (currentStep === 'flavor') { out.favorite_flavors = [...new Set([...out.favorite_flavors, value])]; out.flavor_answered = true; }
    if (currentStep === 'atmosphere') { out.preferred_atmosphere = [...new Set([...out.preferred_atmosphere, value])]; out.atmosphere_answered = true; }
    break;
  }
  return out;
}

export async function handleIncomingMessage(message) {
  const user = await getOrCreateUser(message.from, message.name);
  let text = message.text;
  if (message.type === 'audio' && message.audioId) {
    const media = await downloadMedia(message.audioId);
    text = await transcribeAudio(media.buffer, media.mimeType, `voice-${message.id}.ogg`);
  }
  if (!text?.trim()) {
    await sendText(message.from, 'نقدر نفهم الرسائل المكتوبة والصوتية دابا. صيفط ليا شنو بغيتي تاكل ولا شنو كيعجبك فالأكل.');
    return;
  }
  let state = await getConversationState(user.id);
  if (isRecommendationFollowUp(text) && (!state?.missing_preferences?.length || state?.current_step === 'complete')) {
    await sendBestRecommendationFollowUp(message.from, user.id, text);
    return;
  }
  if (isGenericRestaurantIntent(text) && (!state?.missing_preferences?.length || state?.current_step === 'complete')) {
    await resetPreferenceSurvey(user.id, text);
    const block = onboarding.welcome;
    const options = block.options?.length ? `\n\n${block.options.map((item) => `• ${item}`).join('\n')}` : '';
    await sendText(message.from, `${block.text}${options}`);
    return;
  }
  const currentStep = state?.current_step && state.current_step !== 'complete' ? state.current_step : state?.missing_preferences?.[0] || null;
  let patch = await parseTasteMessage(text, { currentStep });
  patch = applyDeterministicStepReply(patch, text, currentStep);
  const result = await applyTasteUpdate(user.id, patch, text);
  if (patch.allergies.length) await sendText(message.from, allergySafetyMessage);
  if (!result.missing_preferences.length) {
    await sendRecommendationsOrCompletion(message.from, user.id);
    return;
  }
  const next = result.missing_preferences[0];
  const block = onboarding[stepMap[next]];
  if (!block) return;
  const options = block.options?.length ? `\n\n${block.options.map((item) => `• ${item}`).join('\n')}` : '';
  await sendText(message.from, `${block.text}${options}`);
}

function restaurantFromRow(row) {
  return {
    active: row.active,
    cuisine_types: row.cuisine_types || [],
    atmosphere_tags: row.atmosphere_tags || [],
    service_modes: row.service_modes || [],
    service_tags: row.service_tags || [],
    rating: row.rating,
    review_count: row.review_count,
    map_url: row.map_url,
    city: row.restaurant_city || 'Casablanca',
    name: row.restaurant_name
  };
}

async function rankedRecommendations(userId) {
  const profile = await getTasteProfile(userId);
  const rows = await listCandidateDishes();
  return rankDishes(rows.map((row) => ({ dish: row, restaurant: restaurantFromRow(row) })), { profile, distanceKm: null, feedbackSignal: 0 });
}

async function sendBestRecommendationFollowUp(to, userId, text) {
  const ranked = await rankedRecommendations(userId);
  if (!ranked.length) {
    await sendText(to, 'ما لقيتش دابا اقتراح موثّق نقدر نختارو ليك بثقة.');
    return;
  }
  const { dish, restaurant, match } = ranked[0];
  const wantsMap = mapFollowUpPatterns.some((p) => includesPhrase(normalizeText(text), normalizeText(p)));
  const price = dish.price != null ? `${Number(dish.price).toFixed(0)} درهم` : 'الثمن غير متأكد';
  const links = restaurantLinks(restaurant);
  const lines = [
    `أنا نختار ليك هادا: ${dish.name} من ${restaurant.name}.`, `${match.score}% مناسب لذوقك`, `💰 ${price}`,
    restaurant.rating != null ? `⭐ ${restaurant.rating}` : null,
    wantsMap ? `📍 Google Maps: ${links.map}` : null,
    `📸 Instagram: ${links.instagram}`
  ].filter(Boolean);
  await sendText(to, lines.join('\n'));
}

async function sendRecommendationsOrCompletion(to, userId) {
  const profile = await getTasteProfile(userId);
  const rows = await listCandidateDishes();
  if (!rows.length) {
    await sendText(to, `${completionMessage}\n\nالبروفايل ديالك واجد. ملي ندخلو بيانات المطاعم والأطباق، غادي نوريك أحسن 3 اقتراحات بالثمن والصورة.`);
    return;
  }
  const ranked = rankDishes(rows.map((row) => ({ dish: row, restaurant: restaurantFromRow(row) })), { profile, distanceKm: null, feedbackSignal: 0 });
  if (!ranked.length) {
    await sendText(to, 'لقيت المعلومات ديالك ولكن ما لقيتش دابا طبق كيدوز شروطك، خصوصاً الحساسية والتفضيلات. غادي نفضّل ما نخمنش عليك.');
    return;
  }
  await sendText(to, 'ها أحسن الاقتراحات اللي لقيت ليك دابا على حساب الأجوبة ديالك:');
  for (const item of ranked) {
    const { dish, restaurant, match } = item;
    const price = dish.price != null ? `${Number(dish.price).toFixed(0)} درهم` : 'الثمن غير متأكد';
    const rating = restaurant.rating != null ? `⭐ ${restaurant.rating}` : null;
    const links = restaurantLinks(restaurant);
    const baseCaption = [
      `${match.score}% مناسب لذوقك`, `🍽️ ${dish.name}`, `📍 ${restaurant.name}`, `💰 ${price}`, rating,
      dish.description ? `📝 ${dish.description}` : null,
      dish.data_confidence !== 'verified' ? 'ℹ️ بعض معلومات هاد الطبق خاصها تأكيد إضافي.' : null,
      `🗺️ Google Maps: ${links.map}`, `📸 Instagram: ${links.instagram}`
    ].filter(Boolean).join('\n');

    if (dish.photo_url && dish.image_confidence === 'verified') {
      await sendImage(to, dish.photo_url, `${baseCaption}\n✅ صورة موثقة لنفس الطبق.`);
    } else if (dish.photo_url) {
      await sendImage(to, dish.photo_url, `${baseCaption}\n⚠️ صورة تقريبية لنفس نوع الطبق، ماشي بالضرورة من نفس المطعم.`);
    } else {
      await sendText(to, `${baseCaption}\n📷 ما عنديش صورة جاهزة دابا. صور تقريبية لنفس الطبق: ${googleImageSearchUrl(dish.name)}`);
    }
  }
}
