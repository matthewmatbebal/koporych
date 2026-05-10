import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'
import { runSeed } from '@/payload/seed'

// Защита: принимает запросы только с правильным секретом
// Вызов: GET http://localhost:3000/api/seed?secret=seed-koporych

const SEED_SECRET = process.env.SEED_SECRET || 'seed-koporych'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  if (searchParams.get('secret') !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayloadClient()
    const result = await runSeed(payload)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[seed] Error:', err)
    return NextResponse.json(
      { error: String(err) },
      { status: 500 },
    )
  }
}
