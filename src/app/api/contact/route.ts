import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/sendpulse'

interface ContactBody {
  name: string
  phone: string
  email: string
  message: string
}

export async function POST(req: Request) {
  try {
    const body: ContactBody = await req.json()

    const smtpFrom = process.env.SMTP_FROM
    const smtpTo = process.env.SMTP_TO

    if (!smtpFrom || !smtpTo || !process.env.BREVO_API_KEY) {
      console.error('Brevo env vars not configured')
      return NextResponse.json({ success: false, error: 'Mail not configured' }, { status: 500 })
    }

    await sendEmail({
      from: { name: 'Копорыч — заявки', email: smtpFrom },
      to: { email: smtpTo },
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
