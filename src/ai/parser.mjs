const OPENAI_BASE = 'https://api.openai.com/v1';

function requireApiKey() {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured');
  return process.env.OPENAI_API_KEY;
}

export async function parseTasteMessage(text) {
  if (!text?.trim()) return emptyPatch();

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
          content: `You extract food preferences from Moroccan Darija, Arabic, French, English, or Italian. Return JSON only with these fields: favorite_foods, favorite_flavors, disliked_foods, allergies, dietary_restrictions, budget_min, budget_max, preferred_atmosphere, max_distance_km, confidence_score, dislikes_answered, allergies_answered, budget_answered, atmosphere_answered. Arrays must contain normalized short lowercase tags in English where practical. Numeric money is MAD. If a field is unknown use [] or null. Boolean *_answered fields should be true when the user explicitly answered that topic even with none/no preference. Never infer allergies.`
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
    dislikes_answered: Boolean(input.dislikes_answered),
    allergies_answered: Boolean(input.allergies_answered),
    budget_answered: Boolean(input.budget_answered),
    atmosphere_answered: Boolean(input.atmosphere_answered)
  };
}

function emptyPatch() {
  return sanitizePatch({});
}
