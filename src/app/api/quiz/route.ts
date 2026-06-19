import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const RECIPIENT = 'info@houwaartleeft.be';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: bots vullen het verborgen veld in → stilletjes negeren.
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const teamName = String(body.teamName ?? '').trim();
    const contactName = String(body.contactName ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const participants = String(body.participants ?? '').trim();
    const remarks = String(body.remarks ?? '').trim();

    // Basisvalidatie
    if (!teamName || !contactName || !email || !phone || !participants) {
      return NextResponse.json({ error: 'Ontbrekende velden' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safe = {
      teamName: escapeHtml(teamName),
      contactName: escapeHtml(contactName),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      participants: escapeHtml(participants),
      remarks: escapeHtml(remarks),
    };

    // 1) Melding naar de organisatie
    const adminHtml = `
<h2 style="color:#1f3a5f">Nieuwe quizinschrijving – Houwaart Leeft</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
  <tr><td style="padding:4px 12px 4px 0;color:#666">Ploegnaam</td><td><strong>${safe.teamName}</strong></td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#666">Contactpersoon</td><td>${safe.contactName}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#666">E-mail</td><td>${safe.email}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#666">Telefoon</td><td>${safe.phone}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#666">Aantal deelnemers</td><td>${safe.participants}</td></tr>
  ${safe.remarks ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Opmerkingen</td><td>${safe.remarks}</td></tr>` : ''}
</table>`.trim();

    await transporter.sendMail({
      from: `"Houwaart Leeft" <${process.env.SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: email,
      subject: `Quizinschrijving: ${teamName}`,
      text: `Nieuwe quizinschrijving – Houwaart Leeft\n\nPloegnaam: ${teamName}\nContactpersoon: ${contactName}\nE-mail: ${email}\nTelefoon: ${phone}\nAantal deelnemers: ${participants}\nOpmerkingen: ${remarks || '—'}`,
      html: adminHtml,
    });

    // 2) Bevestiging naar de inschrijver
    const confirmHtml = `
<div style="font-family:sans-serif;font-size:14px;color:#333;max-width:600px">
  <h2 style="color:#1f3a5f">Bedankt voor jullie inschrijving, ${safe.contactName}!</h2>
  <p>Ploeg <strong>${safe.teamName}</strong> is ingeschreven voor <strong>De Knollenquiz</strong> tijdens Houwaart Leeft.</p>
  <table style="border-collapse:collapse;font-size:14px;margin-top:12px">
    <tr><td style="padding:4px 12px 4px 0;color:#666">Wanneer</td><td><strong>Zaterdag 12 september 2026, 19u30</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Waar</td><td>Houwaart (Tielt-Winge)</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Aantal deelnemers</td><td>${safe.participants}</td></tr>
  </table>
  <p style="margin-top:16px">We kijken er naar uit! Heb je nog een vraag, antwoord gerust op deze mail.</p>
  <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
  <p style="color:#e8662a;font-weight:bold">Het Houwaart Leeft team</p>
  <p style="color:#666;font-size:13px">✉️ <a href="mailto:${RECIPIENT}" style="color:#1f3a5f">${RECIPIENT}</a></p>
</div>`.trim();

    await transporter.sendMail({
      from: `"Houwaart Leeft" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Jullie inschrijving voor De Knollenquiz – Houwaart Leeft',
      text: `Bedankt voor jullie inschrijving, ${contactName}!\n\nPloeg ${teamName} is ingeschreven voor De Knollenquiz tijdens Houwaart Leeft.\n\nWanneer: zaterdag 12 september 2026, 19u30\nWaar: Houwaart (Tielt-Winge)\nAantal deelnemers: ${participants}\n\nTot op de quiz!\nHet Houwaart Leeft team\n${RECIPIENT}`,
      html: confirmHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Quiz mail error:', err);
    return NextResponse.json({ error: 'Mail failed' }, { status: 500 });
  }
}
