import { parseTasteMessage, transcribeAudio } from '../ai/parser.mjs';
import { applyTasteUpdate, getOrCreateUser } from '../db.mjs';
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

  const patch = await parseTasteMessage(text);
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
