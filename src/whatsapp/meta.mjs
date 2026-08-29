const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v25.0';
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;

function requireMeta() {
  if (!process.env.META_ACCESS_TOKEN) throw new Error('META_ACCESS_TOKEN is not configured');
  if (!process.env.META_PHONE_NUMBER_ID) throw new Error('META_PHONE_NUMBER_ID is not configured');
  return { token: process.env.META_ACCESS_TOKEN, phoneNumberId: process.env.META_PHONE_NUMBER_ID };
}

export function extractIncomingMessages(payload) {
  const out = [];
  for (const entry of payload?.entry || []) for (const change of entry?.changes || []) {
    const value = change?.value;
    const contacts = new Map((value?.contacts || []).map((c) => [c.wa_id, c.profile?.name || null]));
    for (const message of value?.messages || []) out.push({
      id: message.id, from: message.from, name: contacts.get(message.from) || null, type: message.type,
      text: message.text?.body || message.button?.text || message.interactive?.button_reply?.title || message.interactive?.list_reply?.title || null,
      interactiveId: message.interactive?.button_reply?.id || message.interactive?.list_reply?.id || null,
      location: message.location ? { latitude: message.location.latitude, longitude: message.location.longitude, name: message.location.name || null, address: message.location.address || null } : null,
      audioId: message.audio?.id || null, audioMimeType: message.audio?.mime_type || 'audio/ogg', raw: message
    });
  }
  return out;
}

async function sendPayload(payload) {
  const { token, phoneNumberId } = requireMeta();
  const response = await fetch(`${GRAPH_BASE}/${phoneNumberId}/messages`, { method:'POST', headers:{ Authorization:`Bearer ${token}`,'Content-Type':'application/json' }, body:JSON.stringify(payload) });
  if (!response.ok) { const details = await response.text().catch(()=> ''); throw new Error(`WhatsApp send failed: ${response.status}${details ? ` ${details.slice(0,300)}` : ''}`); }
  return response.json();
}

export async function sendText(to, body) {
  return sendPayload({ messaging_product:'whatsapp', recipient_type:'individual', to, type:'text', text:{ preview_url:false, body } });
}

export async function sendButtons(to, body, buttons = []) {
  const safe = buttons.slice(0,3).map((b,i) => ({ type:'reply', reply:{ id:String(b.id || `choice_${i+1}`).slice(0,256), title:String(b.title || '').slice(0,20) } }));
  return sendPayload({ messaging_product:'whatsapp', recipient_type:'individual', to, type:'interactive', interactive:{ type:'button', body:{ text:String(body).slice(0,1024) }, action:{ buttons:safe } } });
}

export async function sendList(to, body, buttonText, rows = []) {
  return sendPayload({ messaging_product:'whatsapp', recipient_type:'individual', to, type:'interactive', interactive:{ type:'list', body:{ text:String(body).slice(0,1024) }, action:{ button:String(buttonText).slice(0,20), sections:[{ title:'الاختيارات', rows:rows.slice(0,10).map((r,i)=>({ id:String(r.id || `option_${i+1}`).slice(0,200), title:String(r.title || '').slice(0,24), ...(r.description ? { description:String(r.description).slice(0,72) } : {}) })) }] } } });
}

export async function sendImage(to, imageUrl, caption='') {
  if (!/^https:\/\//i.test(String(imageUrl || ''))) throw new Error('WhatsApp image requires a public HTTPS URL');
  return sendPayload({ messaging_product:'whatsapp', recipient_type:'individual', to, type:'image', image:{ link:imageUrl, ...(caption ? { caption:String(caption).slice(0,1024) } : {}) } });
}

export async function downloadMedia(mediaId) {
  const { token } = requireMeta();
  const metadataResponse = await fetch(`${GRAPH_BASE}/${mediaId}`, { headers:{ Authorization:`Bearer ${token}` } });
  if (!metadataResponse.ok) throw new Error(`WhatsApp media lookup failed: ${metadataResponse.status}`);
  const metadata = await metadataResponse.json();
  if (!metadata.url) throw new Error('WhatsApp media URL missing');
  const fileResponse = await fetch(metadata.url, { headers:{ Authorization:`Bearer ${token}` } });
  if (!fileResponse.ok) throw new Error(`WhatsApp media download failed: ${fileResponse.status}`);
  return { buffer:await fileResponse.arrayBuffer(), mimeType:fileResponse.headers.get('content-type') || metadata.mime_type || 'audio/ogg' };
}
