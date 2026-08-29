const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v25.0';
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;

function requireMeta() {
  if (!process.env.META_ACCESS_TOKEN) throw new Error('META_ACCESS_TOKEN is not configured');
  if (!process.env.META_PHONE_NUMBER_ID) throw new Error('META_PHONE_NUMBER_ID is not configured');
  return {
    token: process.env.META_ACCESS_TOKEN,
    phoneNumberId: process.env.META_PHONE_NUMBER_ID
  };
}

export function extractIncomingMessages(payload) {
  const out = [];
  for (const entry of payload?.entry || []) {
    for (const change of entry?.changes || []) {
      const value = change?.value;
      const contacts = new Map((value?.contacts || []).map((c) => [c.wa_id, c.profile?.name || null]));
      for (const message of value?.messages || []) {
        out.push({
          id: message.id,
          from: message.from,
          name: contacts.get(message.from) || null,
          type: message.type,
          text: message.text?.body || message.button?.text || message.interactive?.button_reply?.title || message.interactive?.list_reply?.title || null,
          audioId: message.audio?.id || null,
          audioMimeType: message.audio?.mime_type || 'audio/ogg',
          raw: message
        });
      }
    }
  }
  return out;
}

async function sendPayload(payload) {
  const { token, phoneNumberId } = requireMeta();
  const response = await fetch(`${GRAPH_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(`WhatsApp send failed: ${response.status}${details ? ` ${details.slice(0, 300)}` : ''}`);
  }
  return response.json();
}

export async function sendText(to, body) {
  return sendPayload({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: { preview_url: false, body }
  });
}

export async function sendImage(to, imageUrl, caption = '') {
  if (!/^https:\/\//i.test(String(imageUrl || ''))) throw new Error('WhatsApp image requires a public HTTPS URL');
  return sendPayload({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'image',
    image: {
      link: imageUrl,
      ...(caption ? { caption: String(caption).slice(0, 1024) } : {})
    }
  });
}

export async function downloadMedia(mediaId) {
  const { token } = requireMeta();
  const metadataResponse = await fetch(`${GRAPH_BASE}/${mediaId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!metadataResponse.ok) throw new Error(`WhatsApp media lookup failed: ${metadataResponse.status}`);
  const metadata = await metadataResponse.json();
  if (!metadata.url) throw new Error('WhatsApp media URL missing');

  const fileResponse = await fetch(metadata.url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!fileResponse.ok) throw new Error(`WhatsApp media download failed: ${fileResponse.status}`);
  return {
    buffer: await fileResponse.arrayBuffer(),
    mimeType: fileResponse.headers.get('content-type') || metadata.mime_type || 'audio/ogg'
  };
}
