import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

interface CartItem {
  id: string
  name: string
  price: number
  weight: string
  quantity: number
}

interface OrderBody {
  customer: { name: string; phone: string; email: string }
  delivery: { method: string; address?: string }
  payment: { method: string }
  comment?: string
  items: CartItem[]
  total: number
}

function generateOrderNumber(): string {
  const d = new Date()
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const suffix = String(Date.now()).slice(-4)
  return `КП-${date}-${suffix}`
}

function itemsTable(items: CartItem[]): string {
  return items
    .map(i => `<tr>
      <td style="padding:6px 12px 6px 0">${i.name} (${i.weight})</td>
      <td style="padding:6px 12px;text-align:center">${i.quantity}</td>
      <td style="padding:6px 0 6px 12px;text-align:right">${(i.price * i.quantity).toLocaleString('ru-RU')} ₽</td>
    </tr>`)
    .join('')
}

function ownerHtml(order: OrderBody, orderNumber: string): string {
  return `
<html><body style="font-family:sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="color:#2d6a4f">Новый заказ ${orderNumber}</h2>

  <h3>Покупатель</h3>
  <p><b>ФИО/Компания:</b> ${order.customer.name}<br>
  <b>Телефон:</b> ${order.customer.phone}<br>
  <b>E-mail:</b> ${order.customer.email}</p>

  <h3>Доставка</h3>
  <p><b>Способ:</b> ${order.delivery.method}${order.delivery.address ? `<br><b>Адрес:</b> ${order.delivery.address}` : ''}</p>

  <h3>Оплата</h3>
  <p>${order.payment.method}</p>

  ${order.comment ? `<h3>Комментарий</h3><p>${order.comment}</p>` : ''}

  <h3>Состав заказа</h3>
  <table style="border-collapse:collapse;width:100%">
    <thead>
      <tr style="border-bottom:2px solid #e0e0e0">
        <th style="text-align:left;padding:6px 12px 6px 0">Товар</th>
        <th style="padding:6px 12px">Кол-во</th>
        <th style="text-align:right;padding:6px 0 6px 12px">Сумма</th>
      </tr>
    </thead>
    <tbody>${itemsTable(order.items)}</tbody>
    <tfoot>
      <tr style="border-top:2px solid #e0e0e0">
        <td colspan="2" style="padding:8px 0"><b>Итого (без доставки)</b></td>
        <td style="text-align:right;padding:8px 0 8px 12px"><b>${order.total.toLocaleString('ru-RU')} ₽</b></td>
      </tr>
    </tfoot>
  </table>
</body></html>`
}

function customerHtml(order: OrderBody, orderNumber: string): string {
  return `
<html><body style="font-family:sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="color:#2d6a4f">Заказ принят!</h2>
  <p>${order.customer.name}, спасибо за заказ.</p>
  <p>Номер вашего заказа: <b>${orderNumber}</b></p>
  <p>Мы свяжемся с вами по номеру <b>${order.customer.phone}</b> в ближайшее время для уточнения деталей.</p>

  <h3>Состав заказа</h3>
  <table style="border-collapse:collapse;width:100%">
    <thead>
      <tr style="border-bottom:2px solid #e0e0e0">
        <th style="text-align:left;padding:6px 12px 6px 0">Товар</th>
        <th style="padding:6px 12px">Кол-во</th>
        <th style="text-align:right;padding:6px 0 6px 12px">Сумма</th>
      </tr>
    </thead>
    <tbody>${itemsTable(order.items)}</tbody>
    <tfoot>
      <tr style="border-top:2px solid #e0e0e0">
        <td colspan="2" style="padding:8px 0"><b>Итого (без доставки)</b></td>
        <td style="text-align:right;padding:8px 0 8px 12px"><b>${order.total.toLocaleString('ru-RU')} ₽</b></td>
      </tr>
    </tfoot>
  </table>

  <p style="margin-top:24px;color:#666;font-size:14px">
    Копорыч — иван-чай ручной сборки<br>
    Если у вас есть вопросы, напишите нам или позвоните.
  </p>
</body></html>`
}

export async function POST(req: Request) {
  try {
    const order: OrderBody = await req.json()
    const orderNumber = generateOrderNumber()

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpTo = process.env.SMTP_TO

    if (!smtpUser || !smtpPass || !smtpTo) {
      console.error('SMTP env vars not configured')
      return NextResponse.json({ success: false, error: 'Mail not configured' }, { status: 500 })
    }

    const transportOptions: SMTPTransport.Options & { family?: number } = {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      family: 4,
      auth: { user: smtpUser, pass: smtpPass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    }
    const transporter = nodemailer.createTransport(transportOptions)

    await transporter.sendMail({
      from: `"Копорыч — заказы" <${smtpUser}>`,
      to: smtpTo,
      subject: `Новый заказ ${orderNumber} от ${order.customer.name}`,
      html: ownerHtml(order, orderNumber),
    })

    await transporter.sendMail({
      from: `"Копорыч" <${smtpUser}>`,
      to: order.customer.email,
      subject: `Заказ ${orderNumber} принят — Копорыч`,
      html: customerHtml(order, orderNumber),
    })

    return NextResponse.json({ success: true, orderNumber })
  } catch (err) {
    console.error('Order route error:', err)
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
