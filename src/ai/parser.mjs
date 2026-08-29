import { referenceSummary } from '../reference/food-taxonomy.mjs';

const OPENAI_BASE = 'https://api.openai.com/v1';

function requireApiKey() {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured');
  return process.env.OPENAI_API_KEY;
}

export async function parseTasteMessage(text, context = {}) {
  if (!text?.trim()) return emptyPatch();

  const currentStep = context.currentStep || null;
  const response = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${requireApiKey()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_TEXT_MODEL || 'gpt-4.1-mini',
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are Dooq AI's food-preference parser. Extract preferences from Moroccan Darija, Arabic, French, English, or Italian and return JSON only.

Canonical reference: ${referenceSummary()}

Return these fields exactly: favorite_foods, favorite_flavors, disliked_foods, allergies, dietary_restrictions, budget_min, budget_max, preferred_atmosphere, max_distance_km, confidence_score, preferred_cuisines, preferred_textures, preferred_occasions, preferred_service_modes, service_priorities, portion_preferences, spicy_preference, health_priority, dislikes_answered, allergies_answered, budget_answered, atmosphere_answered, flavor_answered, food_answered.

Rules:
- Arrays contain normalized short English tags from the canonical reference whenever possible.
- Numeric money is MAD. Distance is km. health_priority is 0-5.
- Never infer allergies. Allergies are a safety constraint, not a recommendation score.
- Understand the whole free-form message. Example: "عشاء رومانسي" => preferred_occasions includes dinner and date_night, preferred_atmosphere includes romantic, atmosphere_answered=true.
- If the user explicitly says no preference/details for the current topic (e.g. ما عنديش تفاصيل، ما عنديش تفضيل، أي حاجة، مش مهم, whatever, no preference), mark that current topic answered instead of leaving it missing. Current topic: ${currentStep || 'unknown'}.
- If current topic is flavor set flavor_answered=true for a no-preference reply. If food set food_answered=true. For dislikes/allergies/budget/atmosphere use the corresponding *_answered field.
- If the user says the question is repeated, do not invent a preference; mark the current topic answered and advance.
- Capture occasion, cuisine, texture, portion, service mode, health priority, spicy preference, distance and atmosphere opportunistically even when they were not explicitly asked.`
        },
        { role: 'user', content: text }
      ]
    })
  });

  if (!response.ok) throw new Error(`OpenAI parse failed: ${response.status}`);
  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content || '{}';
  return sanitizePatch(JSON.parse(raw));
}

export async function transcribeAudio(audioBuffer, mimeType = 'audio/ogg', filename = 'voice.ogg') {
  const form = new FormData();
  form.append('model', process.env.OPENAI_TRANSCRIBE_MODEL || 'gpt-4o-mini-transcribe');
  form.append('file', new Blob([audioBuffer], { type: mimeType }), filename);

  const response = await fetch(`${OPENAI_BASE}/audio/transcriptions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${requireApiKey()}` },
    body: form
  });

  if (!response.ok) throw new Error(`OpenAI transcription failed: ${response.status}`);
  const data = await response.json();
  return String(data.text || '').trim();
}

function sanitizePatch(input = {}) {
  const arr = (v) => Array.isArray(v) ? v.filter(Boolean).map((x) => String(x).trim().toLowerCase()) : [];
  const num = (v) => Number.isFinite(Number(v)) ? Number(v) : null;
  const text = (v) => v == null || v === '' ? null : String(v).trim().toLowerCase();
  return {
    favorite_foods: arr(input.favorite_foods),
    favorite_flavors: arr(input.favorite_flavors),
    disliked_foods: arr(input.disliked_foods),
    allergies: arr(input.allergies),
    dietary_restrictions: arr(input.dietary_restrictions),
    budget_min: num(input.budget_min),
    budget_max: num(input.budget_max),
    preferred_atmosphere: arr(input.preferred_atmosphere),
    max_distance_km: num(input.max_distance_km),
    confidence_score: Math.max(0, Math.min(100, num(input.confidence_score) ?? 60)),
    preferred_cuisines: arr(input.preferred_cuisines),
    preferred_textures: arr(input.preferred_textures),
    preferred_occasions: arr(input.preferred_occasions),
    preferred_service_modes: arr(input.preferred_service_modes),
    service_priorities: arr(input.service_priorities),
    portion_preferences: arr(input.portion_preferences),
    spicy_preference: text(input.spicy_preference),
    health_priority: num(input.health_priority) == null ? null : Math.max(0, Math.min(5, Math.round(num(input.health_priority)))),
    dislikes_answered: Boolean(input.dislikes_answered),
    allergies_answered: Boolean(input.allergies_answered),
    budget_answered: Boolean(input.budget_answered),
    atmosphere_answered: Boolean(input.atmosphere_answered),
    flavor_answered: Boolean(input.flavor_answered),
    food_answered: Boolean(input.food_answered)
  };
}

function emptyPatch() {
  return sanitizePatch({});
}
