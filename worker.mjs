// Cloudflare Worker: secrets belong in Cloudflare, never in public/config.js.
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
});
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/contact') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return json({ success: false, code: 'METHOD_NOT_ALLOWED' }, 405);
    if (request.headers.get('Origin') !== url.origin) return json({ success: false, code: 'INVALID_ORIGIN' }, 403);
    if (!request.headers.get('Content-Type')?.includes('application/json')) return json({ success: false, code: 'INVALID_CONTENT_TYPE' }, 415);
    if (!env.RESEND_API_KEY) return json({ success: false, code: 'EMAIL_NOT_CONFIGURED' }, 503);
    let input;
    try {
      const raw = await request.text();
      if (raw.length > 20000) return json({ success: false, code: 'INVALID_DETAILS' }, 413);
      input = JSON.parse(raw);
    } catch { return json({ success: false, code: 'INVALID_DETAILS' }, 400); }
    const text = key => typeof input?.[key] === 'string' ? input[key].trim() : '';
    const name = text('name'), email = text('email'), message = text('message'), service = text('service');
    if (!name || name.length > 200 || !message || message.length > 10000 || service.length > 200 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ success: false, code: 'INVALID_DETAILS' }, 400);
    }
    const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    const subject = text('_subject') === 'EIC — Request Quote' ? 'EIC — Request Quote' : 'EIC — Contact Request';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.EMAIL_FROM || 'EIC Portal <contact@eicportal.com>',
          to: ['contact@eicportal.com'],
          reply_to: email,
          subject,
          html: `<h2>${escapeHtml(subject)}</h2><table cellpadding="10" style="border-collapse:collapse;font-family:Arial,sans-serif"><tr><th align="left">Name</th><td>${escapeHtml(name)}</td></tr><tr><th align="left">Email</th><td>${escapeHtml(email)}</td></tr>${service ? `<tr><th align="left">Service</th><td>${escapeHtml(service)}</td></tr>` : ''}<tr><th align="left">Message</th><td style="white-space:pre-wrap">${escapeHtml(message)}</td></tr></table>`,
          text: `Name: ${name}\nEmail: ${email}\n${service ? `Service: ${service}\n` : ''}\n${message}`
        }),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || !result.id) {
        console.error('Email provider rejected submission', response.status, result.name || 'unknown');
        return json({ success: false, code: 'EMAIL_PROVIDER_ERROR' }, 502);
      }
      return json({ success: true, id: result.id });
    } catch {
      return json({ success: false, code: 'EMAIL_CONNECTION_ERROR' }, 502);
    } finally { clearTimeout(timeout); }
  }
};
