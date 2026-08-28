import 'dotenv/config';
import express from 'express';
import { onboarding, nextMissingPreference } from './onboarding/darija.mjs';
import { extractIncomingMessages } from './whatsapp/meta.mjs';
import { handleIncomingMessage } from './whatsapp/handler.mjs';

const app = express();
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'dooq-ai',
    version: '0.2.0',
    darijaOnboarding: true,
    matchingEngine: true,
    whatsappWebhook: true,
    aiTasteParser: true,
    audioTranscription: true,
    postgresTasteProfile: true
  });
});

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token && token === process.env.META_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.post('/webhook', (req, res) => {
  // Meta expects a fast 200. Processing happens after acknowledgement.
  res.sendStatus(200);

  const messages = extractIncomingMessages(req.body);
  for (const message of messages) {
    handleIncomingMessage(message).catch((error) => {
      console.error('Failed to process WhatsApp message', {
        messageId: message.id,
        from: message.from,
        error: error?.message || String(error)
      });
    });
  }
});

app.get('/api/onboarding/:step?', (req, res) => {
  const step = req.params.step || 'welcome';
  const payload = onboarding[step];
  if (!payload) return res.status(404).json({ error: 'unknown_step' });
  res.json(payload);
});

app.post('/api/onboarding/next', (req, res) => {
  const missing = Array.isArray(req.body?.missing_preferences) ? req.body.missing_preferences : [];
  const next = nextMissingPreference(missing);
  if (!next) return res.json({ complete: true });
  const key = next === 'food' ? 'welcome' : next;
  res.json({ complete: false, preference: next, ...onboarding[key] });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Dooq AI listening on :${port}`));
