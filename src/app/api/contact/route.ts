import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

interface ContactBody {
  name: string
  phone: string
  email: string
  message: string
}

export async function POST(req: Request) {
  try {
    const body: ContactBody = await req.json()

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpTo = process.env.SMTP_TO

    if (!smtpUser || !smtpPass || !smtpTo) {
      console.error('SMTP env vars not configured')
      return NextResponse.json({ success: false, error: 'Mail not configured' }, { status: 500 })
    }

    const transportOptions: SMTPTransport.Options & { family?: number } = {
      host: 'smtp.yandex.ru',
      port: 587,
      secure: false,
      family: 4,
      auth: { user: smtpUser, pass: smtpPass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    }
    const transporter = nodemailer.createTransport(transportOptions)

    await transporter.sendMail({
      from: `"Копорыч — заявки" <${smtpUser}>`,
      to: smtpTo,
      subject: `Новая заявка от ${body.name}`,
      html: `
<html><body style="font-family:sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="color:#2d6a4f">Новая заявка с сайта</h2>
  <p><b>Имя:</b> ${body.name}<br>
  <b>Телефон:</b> ${body.phone}<br>
  <b>E-mail:</b> ${body.email}</p>
  <h3>Вопрос</h3>
  <p>${body.message}</p>
</body></html>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
