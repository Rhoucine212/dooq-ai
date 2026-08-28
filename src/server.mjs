import 'dotenv/config';
import express from 'express';
import { onboarding, nextMissingPreference } from './onboarding/darija.mjs';
import { extractIncomingMessages } from './whatsapp/meta.mjs';
import { handleIncomingMessage } from './whatsapp/handler.mjs';
import { ensureDatabaseSchema } from './init-db.mjs';

let databaseReady = false;
let databaseConfigured = Boolean(process.env.DATABASE_URL);

try {
  const databaseState = await ensureDatabaseSchema();
  databaseConfigured = databaseState.configured;
  databaseReady = databaseState.initialized;
} catch (error) {
  console.error('Dooq AI database initialization failed', error?.message || String(error));
}

const app = express();
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'dooq-ai',
    version: '0.2.2',
    darijaOnboarding: true,
    matchingEngine: true,
    whatsappWebhook: true,
    aiTasteParser: true,
    audioTranscription: true,
    postgresTasteProfile: true,
    databaseConfigured,
    databaseReady,
    automaticDatabaseInit: true
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

function sendOnboardingStep(step, res) {
  const payload = onboarding[step];
  if (!payload) return res.status(404).json({ error: 'unknown_step' });
  return res.json(payload);
}

app.get('/api/onboarding', (_req, res) => {
  return sendOnboardingStep('welcome', res);
});

app.get('/api/onboarding/:step', (req, res) => {
  return sendOnboardingStep(req.params.step, res);
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
