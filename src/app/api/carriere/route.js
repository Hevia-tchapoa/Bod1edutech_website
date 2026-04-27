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
    const formData = await request.formData();
    const civility  = formData.get('civility')  || '';
    const firstName = formData.get('firstName') || '';
    const lastName  = formData.get('lastName')  || '';
    const email     = formData.get('email')     || '';
    const poste     = formData.get('poste')     || '';
    const message   = formData.get('message')   || '';
    const cvFile    = formData.get('cv');
    const lmFile    = formData.get('lm');

    const attachments = [];
    if (cvFile && cvFile.size > 0) {
      attachments.push({ filename: cvFile.name, content: Buffer.from(await cvFile.arrayBuffer()) });
    }
    if (lmFile && lmFile.size > 0) {
      attachments.push({ filename: lmFile.name, content: Buffer.from(await lmFile.arrayBuffer()) });
    }

    console.log(`[Carrière] Candidature de ${civility} ${firstName} ${lastName}`);

    const piecesList = attachments.length > 0
      ? attachments.map(a => `<span style="display:inline-block;background:#ede9ff;color:#5932E8;border-radius:4px;padding:3px 10px;font-size:12px;font-family:Arial,sans-serif;margin:2px">${a.filename}</span>`).join(' ')
      : '<span style="color:#999;font-size:12px;font-family:Arial,sans-serif">Aucune pièce jointe</span>';

    const body = `
      ${emailHeader('Nouvelle candidature', `${civility} ${firstName} ${lastName} postule chez BOD1 EduTech`)}
      <tr><td style="padding:0">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff">
          ${emailRow('Civilité', civility, false)}
          ${emailRow('Nom', `${firstName} ${lastName}`, true)}
          ${emailRow('Email', `<a href="mailto:${email}" style="color:#5932E8;text-decoration:none">${email}</a>`, false)}
          ${emailRow('Type de poste', poste, true)}
          ${message ? emailMessageRow('Message', message) : ''}
        </table>
        <div style="background:#f7f5ff;padding:16px 20px;border-top:1px solid #ede9ff">
          <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#5932E8;text-transform:uppercase;letter-spacing:1px">Pièces jointes</p>
          <div>${piecesList}</div>
        </div>
        <div style="background:#f7f5ff;padding:12px 20px">
          <a href="mailto:${email}" style="display:inline-block;background:#5932E8;color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:6px;font-family:Arial,sans-serif;font-size:13px;font-weight:700">Répondre au candidat</a>
        </div>
      </td></tr>
      <tr><td>${emailFooter()}</td></tr>
    `;

    await transporter.sendMail({
      from: `"BOD1 EduTech" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `Candidature - ${civility} ${firstName} ${lastName}`,
      text: buildTextEmail('Nouvelle candidature', [
        ['Civilite', civility],
        ['Nom', `${firstName} ${lastName}`],
        ['Email', email],
        ['Poste', poste],
        ...(message ? [['Message', message]] : []),
        ['Pieces jointes', attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : 'Aucune'],
      ]),
      html: wrapEmail(body),
      attachments,
    });

    console.log('[Carrière] ✅ Mail envoyé avec succès.');
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Carriere mail error:', err);
    return new Response(JSON.stringify({ error: 'Mail error' }), { status: 500 });
  }
}
