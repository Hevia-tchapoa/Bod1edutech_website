export function textSeparator() {
  return '─'.repeat(50);
}

export function buildTextEmail(title, lines) {
  const body = lines.map(([label, value]) => `${label}: ${value}`).join('\n');
  return `BOD1 EduTech — ${title}\n${textSeparator()}\n\n${body}\n\n${textSeparator()}\nBOD1 EduTech · Douala, Cameroun\ncontact@bod1edutech.com · bod1edutech.com`;
}

export function emailHeader(title, subtitle) {
  return `
    <div style="background:linear-gradient(135deg,#3b1d8e 0%,#5932E8 60%,#7c5cf5 100%);padding:36px 40px 28px;text-align:center">
      <div style="display:inline-block;background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.25);border-radius:12px;padding:8px 20px;margin-bottom:18px">
        <span style="color:#F5C518;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase">BOD1 EduTech</span>
      </div>
      <h1 style="color:#ffffff;margin:0 0 8px;font-size:22px;font-family:Arial,sans-serif;font-weight:700">${title}</h1>
      <p style="color:rgba(255,255,255,0.75);margin:0;font-size:13px;font-family:Arial,sans-serif">${subtitle}</p>
    </div>
  `;
}

export function emailRow(label, value, alt) {
  const bg = alt ? '#f7f5ff' : '#ffffff';
  return `
    <tr>
      <td style="padding:12px 16px;background:${bg};font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#5932E8;width:160px;border-bottom:1px solid #ede9ff;white-space:nowrap">${label}</td>
      <td style="padding:12px 16px;background:${bg};font-family:Arial,sans-serif;font-size:13px;color:#1a1a2e;border-bottom:1px solid #ede9ff">${value}</td>
    </tr>
  `;
}

export function emailMessageRow(label, value) {
  return `
    <tr>
      <td style="padding:12px 16px;background:#f7f5ff;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#5932E8;width:160px;border-bottom:1px solid #ede9ff;vertical-align:top">${label}</td>
      <td style="padding:12px 16px;background:#f7f5ff;font-family:Arial,sans-serif;font-size:13px;color:#1a1a2e;border-bottom:1px solid #ede9ff;white-space:pre-wrap;line-height:1.7">${value}</td>
    </tr>
  `;
}

export function emailSectionTitle(text) {
  return `
    <tr>
      <td colspan="2" style="padding:16px 16px 8px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#5932E8;border-bottom:2px solid #5932E8">${text}</td>
    </tr>
  `;
}

export function emailFooter() {
  return `
    <div style="background:#0f0a2e;padding:28px 40px;text-align:center">
      <p style="color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;font-size:12px;margin:0 0 12px">Suivez-nous</p>
      <div style="margin-bottom:20px">
        <a href="https://www.linkedin.com/company/bod1edutech/" style="display:inline-block;margin:0 6px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);line-height:32px;text-align:center;color:#ffffff;text-decoration:none;font-size:13px">in</a>
        <a href="https://www.facebook.com/share/1DgzXuNvBf/" style="display:inline-block;margin:0 6px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);line-height:32px;text-align:center;color:#ffffff;text-decoration:none;font-size:13px">f</a>
        <a href="https://www.instagram.com/bod1edutech" style="display:inline-block;margin:0 6px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);line-height:32px;text-align:center;color:#ffffff;text-decoration:none;font-size:12px">&#9632;</a>
        <a href="https://whatsapp.com/channel/0029VbCvGvv2UPB95TybB70V" style="display:inline-block;margin:0 6px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);line-height:32px;text-align:center;color:#25D366;text-decoration:none;font-size:13px">W</a>
      </div>
      <p style="color:rgba(255,255,255,0.35);font-family:Arial,sans-serif;font-size:11px;margin:0 0 4px">BOD1 EduTech &mdash; Douala, Cameroun</p>
      <p style="color:rgba(255,255,255,0.25);font-family:Arial,sans-serif;font-size:11px;margin:0">
        <a href="mailto:contact@bod1edutech.com" style="color:#7c5cf5;text-decoration:none">contact@bod1edutech.com</a>
        &nbsp;&bull;&nbsp;
        <a href="https://bod1edutech.com" style="color:#7c5cf5;text-decoration:none">bod1edutech.com</a>
      </p>
      <p style="color:rgba(255,255,255,0.15);font-family:Arial,sans-serif;font-size:10px;margin:16px 0 0">&copy; ${new Date().getFullYear()} BOD1 EduTech. Tous droits réservés.</p>
    </div>
  `;
}

export function wrapEmail(content) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f0eeff">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0eeff;padding:32px 0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(89,50,232,0.15)">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
