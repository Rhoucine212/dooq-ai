import 'dotenv/config';
import express from 'express';
import { onboarding, nextMissingPreference } from './onboarding/darija.mjs';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'dooq-ai',
    version: '0.1.0',
    darijaOnboarding: true,
    matchingEngine: true
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
  // MVP base: acknowledge Meta quickly. Message parsing/persistence is added next.
  console.log('WhatsApp webhook event', JSON.stringify(req.body));
  res.sendStatus(200);
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
