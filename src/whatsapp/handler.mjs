import { parseTasteMessage, transcribeAudio } from '../ai/parser.mjs';
import { applyTasteUpdate, getConversationState, getOrCreateUser } from '../db.mjs';
import { onboarding, completionMessage, allergySafetyMessage } from '../onboarding/darija.mjs';
import { downloadMedia, sendText } from './meta.mjs';

const stepMap = {
  food: 'welcome',
  flavor: 'flavor',
  dislikes: 'dislikes',
  allergies: 'allergies',
  budget: 'budget',
  atmosphere: 'atmosphere'
};

const noPreferencePatterns = [
  'ما عنديش تفضيل', 'ما عنديش تفضيل معين', 'ما عنديش تفاصيل', 'أي حاجة', 'اي حاجة',
  'مش مهم', 'ماشي مهم', 'سؤال مكرر', 'نفس السؤال', 'whatever', 'no preference'
];

const stepValueMaps = {
  flavor: [
    [['مشوي', 'grilled', 'grill'], 'grilled'],
    [['حار', 'spicy', 'hot'], 'spicy'],
    [['كريمي', 'creamy'], 'creamy'],
    [['خفيف', 'light'], 'light'],
    [['منعش', 'fresh', 'refreshing'], 'refreshing'],
    [['حلو ومالح', 'sweet and salty', 'sweet salty'], 'sweet-salty']
  ],
  food: [
    [['لحم', 'meat', 'beef'], 'meat'],
    [['دجاج', 'chicken'], 'chicken'],
    [['باستا', 'pasta'], 'pasta'],
    [['بيتزا', 'pizza'], 'pizza'],
    [['حوت', 'سمك', 'fish'], 'fish'],
    [['خفيفة وصحية', 'صحية', 'healthy'], 'healthy-light']
  ],
  atmosphere: [
    [['عائلي', 'family'], 'family'],
    [['رومانسي', 'romantic'], 'romantic'],
    [['هادئ', 'quiet', 'calm'], 'quiet'],
    [['فيه شوية ديال الجو', 'جو', 'lively'], 'lively'],
    [['سريع', 'quick', 'fast'], 'quick'],
    [['منظر زوين', 'view', 'scenic'], 'scenic'],
    [['الأكل يكون ممتاز', 'الاكل يكون ممتاز', 'food first'], 'food-first']
  ]
};

function normalizeText(text = '') {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[ًٌٍَُِّْـ]/g, '')
    .replace(/[؟?!.,،؛:]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesPhrase(text, phrase) {
  return text === phrase || text.includes(phrase);
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

    if (currentStep === 'food') {
      out.favorite_foods = [...new Set([...out.favorite_foods, value])];
      out.food_answered = true;
    }
    if (currentStep === 'flavor') {
      out.favorite_flavors = [...new Set([...out.favorite_flavors, value])];
      out.flavor_answered = true;
    }
    if (currentStep === 'atmosphere') {
      out.preferred_atmosphere = [...new Set([...out.preferred_atmosphere, value])];
      out.atmosphere_answered = true;
    }
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

  const state = await getConversationState(user.id);
  const currentStep = state?.current_step && state.current_step !== 'complete'
    ? state.current_step
    : state?.missing_preferences?.[0] || null;

  let patch = await parseTasteMessage(text, { currentStep });
  patch = applyDeterministicStepReply(patch, text, currentStep);
  const result = await applyTasteUpdate(user.id, patch, text);

  if (patch.allergies.length) {
    await sendText(message.from, allergySafetyMessage);
  }

  if (!result.missing_preferences.length) {
    await sendText(message.from, completionMessage);
    return;
  }

  const next = result.missing_preferences[0];
  const block = onboarding[stepMap[next]];
  if (!block) return;

  const options = block.options?.length
    ? `\n\n${block.options.map((item) => `• ${item}`).join('\n')}`
    : '';
  await sendText(message.from, `${block.text}${options}`);
}
