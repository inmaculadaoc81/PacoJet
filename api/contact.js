import { google } from 'googleapis';

const clean = (v, max = 2000) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max);
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default async function handler(req, res) {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || process.env.GMAIL_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || process.env.GMAIL_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN || process.env.GMAIL_REFRESH_TOKEN;
  const FROM_EMAIL = process.env.GOOGLE_EMAIL || process.env.GMAIL_FROM || 'soporte@kelatos.com';
  const TO_EMAIL = process.env.CONTACT_EMAIL || 'soporte@kelatos.com';

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      service: 'PacTech API',
      node: process.version,
      environment: {
        clientId: Boolean(CLIENT_ID),
        clientSecret: Boolean(CLIENT_SECRET),
        refreshToken: Boolean(REFRESH_TOKEN),
        fromEmail: Boolean(FROM_EMAIL),
        contactEmail: Boolean(TO_EMAIL)
      }
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, code: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const missing = [];
    if (!CLIENT_ID) missing.push('GOOGLE_CLIENT_ID');
    if (!CLIENT_SECRET) missing.push('GOOGLE_CLIENT_SECRET');
    if (!REFRESH_TOKEN) missing.push('GOOGLE_REFRESH_TOKEN');
    if (!FROM_EMAIL) missing.push('GOOGLE_EMAIL');
    if (!TO_EMAIL) missing.push('CONTACT_EMAIL');

    if (missing.length) {
      console.error('PacTech contacto: faltan variables', missing);
      return res.status(500).json({ ok: false, code: 'MISSING_ENVIRONMENT_VARIABLES', missing });
    }

    const { name, email, phone, model, message } = req.body || {};
    const n = clean(name, 80);
    const e = clean(email, 120);
    const p = clean(phone, 30);
    const m = clean(model, 120);
    const msg = clean(message, 2500);

    if (!n || !e || !p || !msg || !emailOk(e)) {
      return res.status(400).json({ ok: false, code: 'INVALID_FORM_DATA' });
    }

    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    // Fuerza OAuth antes del envío para que el log muestre claramente errores de credenciales.
    await oauth2Client.getAccessToken();

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const subject = `Consulta web PacTech - ${n}`;
    const text = [
      'Nueva consulta desde pacojetech.com.es',
      '',
      `Nombre: ${n}`,
      `Email: ${e}`,
      `Teléfono: ${p}`,
      `Modelo: ${m || 'No indicado'}`,
      '',
      'Mensaje:',
      msg
    ].join('\n');

    const rawMessage = [
      `From: PacTech <${FROM_EMAIL}>`,
      `To: ${TO_EMAIL}`,
      `Reply-To: ${e}`,
      `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      '',
      text
    ].join('\r\n');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: Buffer.from(rawMessage).toString('base64url') }
    });

    return res.status(200).json({ ok: true, message: 'Consulta enviada correctamente' });
  } catch (error) {
    console.error('PacTech Gmail API:', {
      message: error?.message,
      code: error?.code,
      status: error?.response?.status,
      googleError: error?.response?.data?.error
    });

    const text = JSON.stringify(error?.response?.data || {}) + String(error?.message || '');
    const code = text.includes('invalid_grant')
      ? 'GOOGLE_OAUTH_INVALID_GRANT'
      : text.includes('invalid_client')
        ? 'GOOGLE_OAUTH_INVALID_CLIENT'
        : 'EMAIL_SEND_FAILED';

    return res.status(500).json({ ok: false, code });
  }
}
