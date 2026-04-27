import nodemailer from 'nodemailer';
import { wrapEmail, emailHeader, emailRow, emailMessageRow, emailFooter, buildTextEmail } from '../_emailTemplate.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    console.log(`[Contact] Envoi à ${process.env.SMTP_TO} depuis ${email}...`);

    const body = `
      ${emailHeader('Nouveau message de contact', 'Un visiteur vous a envoyé un message via le site')}
      <tr><td style="padding:0">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff">
          ${emailRow('Nom', `${firstName} ${lastName}`, false)}
          ${emailRow('Email', `<a href="mailto:${email}" style="color:#5932E8;text-decoration:none">${email}</a>`, true)}
          ${emailRow('Sujet', subject, false)}
          ${emailMessageRow('Message', message)}
        </table>
        <div style="background:#f7f5ff;padding:16px 20px;margin:0">
          <a href="mailto:${email}" style="display:inline-block;background:#5932E8;color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:6px;font-family:Arial,sans-serif;font-size:13px;font-weight:700">Répondre à ${firstName}</a>
        </div>
      </td></tr>
      <tr><td>${emailFooter()}</td></tr>
    `;

    const info = await transporter.sendMail({
      from: `"BOD1 EduTech" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `Contact - ${subject} - ${firstName} ${lastName}`,
      text: buildTextEmail('Message de contact', [
        ['Nom', `${firstName} ${lastName}`],
        ['Email', email],
        ['Sujet', subject],
        ['Message', message],
      ]),
      html: wrapEmail(body),
    });

    console.log('[Contact] ✅ Réponse serveur:', JSON.stringify(info));
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Contact mail error:', err);
    return new Response(JSON.stringify({ error: 'Mail error' }), { status: 500 });
  }
}
