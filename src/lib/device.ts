import { headers } from 'next/headers'

export async function isMobileRequest(): Promise<boolean> {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  return /Mobi|Android|iPhone|iPad|iPod/i.test(ua)
}
