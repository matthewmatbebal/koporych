export async function sendEmail({
  from,
  to,
  subject,
  html,
}: {
  from: { name: string; email: string }
  to: { name?: string; email: string }
  subject: string
  html: string
}): Promise<void> {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: from,
      to: [to],
      subject,
      htmlContent: html,
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Brevo send failed: ${err}`)
  }
}
