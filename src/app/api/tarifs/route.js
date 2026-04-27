import nodemailer from 'nodemailer';
import { wrapEmail, emailHeader, emailRow, emailMessageRow, emailSectionTitle, emailFooter, buildTextEmail } from '../_emailTemplate.js';

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
    const { parentFirst, parentLast, email, phone, childFirst, childAge, level, format, message } = await request.json();

    console.log(`[Tarifs] Pré-inscription de ${parentFirst} ${parentLast} pour ${childFirst}`);

    const body = `
      ${emailHeader('Nouvelle pré-inscription', 'Un parent souhaite inscrire son enfant à BOD1 EduTech')}
      <tr><td style="padding:0">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff">
          ${emailSectionTitle('Parent / Tuteur')}
          ${emailRow('Nom', `${parentFirst} ${parentLast}`, false)}
          ${emailRow('Email', `<a href="mailto:${email}" style="color:#5932E8;text-decoration:none">${email}</a>`, true)}
          ${emailRow('Téléphone', phone || '—', false)}
          ${emailSectionTitle('Enfant')}
          ${emailRow('Prénom', childFirst, false)}
          ${emailRow('Âge', `${childAge} ans`, true)}
          ${emailRow('Niveau souhaité', level, false)}
          ${emailRow('Format', format, true)}
          ${message ? emailMessageRow('Message', message) : ''}
        </table>
        <div style="background:#f7f5ff;padding:16px 20px">
          <a href="mailto:${email}" style="display:inline-block;background:#5932E8;color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:6px;font-family:Arial,sans-serif;font-size:13px;font-weight:700">Contacter ${parentFirst}</a>
        </div>
      </td></tr>
      <tr><td>${emailFooter()}</td></tr>
    `;

    await transporter.sendMail({
      from: `"BOD1 EduTech" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `Inscription - ${parentFirst} ${parentLast} pour ${childFirst}`,
      text: buildTextEmail('Nouvelle pre-inscription', [
        ['Parent', `${parentFirst} ${parentLast}`],
        ['Email', email],
        ['Telephone', phone || '—'],
        ['Enfant', childFirst],
        ['Age', `${childAge} ans`],
        ['Niveau', level],
        ['Format', format],
        ...(message ? [['Message', message]] : []),
      ]),
      html: wrapEmail(body),
    });

    console.log('[Tarifs] ✅ Mail envoyé avec succès.');
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Tarifs mail error:', err);
    return new Response(JSON.stringify({ error: 'Mail error' }), { status: 500 });
  }
}
