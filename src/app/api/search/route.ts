import { NextResponse } from 'next/server'
import MiniSearch from 'minisearch'
import { getAllProducts } from '@/lib/payload/products'
import {
  getHomePage,
  getAboutPage,
  getCooperationPage,
  getDeliveryPage,
  getContactsPage,
  getExcursionsPage,
} from '@/lib/payload/globals'

export interface SearchDoc {
  id: string
  type: 'product' | 'page'
  title: string
  content: string
  url: string
  subtitle?: string
  image?: string
}

let cachedIndex: MiniSearch<SearchDoc> | null = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000

function texts(...vals: (string | undefined | null)[]): string {
  return vals.filter(Boolean).join(' ')
}

async function buildIndex(): Promise<MiniSearch<SearchDoc>> {
  const docs: SearchDoc[] = []

  const [products, home, about, cooperation, delivery, contacts, excursions] =
    await Promise.all([
      getAllProducts(),
      getHomePage(),
      getAboutPage(),
      getCooperationPage(),
      getDeliveryPage(),
      getContactsPage(),
      getExcursionsPage(),
    ])

  // Товары
  for (const p of products) {
    docs.push({
      id: `product-${p.slug}`,
      type: 'product',
      title: p.name,
      content: texts(p.name, p.sub, p.description, p.weight, p.category),
      url: `/catalog/${p.slug}`,
      subtitle: p.sub,
      image: p.images[0],
    })
  }

  // Главная
  docs.push({
    id: 'page-home',
    type: 'page',
    title: 'Главная',
    content: texts(
      home.hero.title,
      home.aboutPreview.title,
      home.aboutPreview.text,
      home.aboutPreview.eyebrow,
    ),
    url: '/',
  })

  // О нас
  docs.push({
    id: 'page-about',
    type: 'page',
    title: 'О нас',
    content: texts(
      about.company.title,
      about.company.intro,
      ...about.company.stages.map(s => s.text),
      about.mission.quote,
      about.mission.source,
      about.video.title,
      about.video.text,
    ),
    url: '/about',
  })

  // Сотрудничество
  docs.push({
    id: 'page-cooperation',
    type: 'page',
    title: 'Сотрудничество',
    content: texts(
      cooperation.title,
      cooperation.intro,
      ...cooperation.items.map(i => `${i.label} ${i.description}`),
      cooperation.outro,
    ),
    url: '/cooperation',
  })

  // Доставка и оплата
  docs.push({
    id: 'page-delivery',
    type: 'page',
    title: 'Доставка и оплата',
    content: texts(
      delivery.hero.title,
      delivery.hero.subtitle,
      ...delivery.deliveryMethods.map(m => `${m.name} ${m.meta}`),
      ...delivery.paymentMethods.map(m => `${m.name} ${m.meta}`),
    ),
    url: '/delivery',
  })

  // Контакты
  docs.push({
    id: 'page-contacts',
    type: 'page',
    title: 'Контакты',
    content: texts(contacts.title),
    url: '/contacts',
  })

  // Экскурсии (только если включены)
  if (excursions.enabled) {
    docs.push({
      id: 'page-excursions',
      type: 'page',
      title: 'Экскурсии',
      content: texts(
        excursions.hero.title,
        excursions.hero.subtitle,
        ...excursions.events.map(e => `${e.caption} ${e.description}`),
      ),
      url: '/excursions',
    })
  }

  const index = new MiniSearch<SearchDoc>({
    fields: ['title', 'content'],
    storeFields: ['id', 'type', 'title', 'url', 'subtitle', 'image'],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  })

  index.addAll(docs)
  return index
}

async function getIndex(): Promise<MiniSearch<SearchDoc>> {
  if (cachedIndex && Date.now() - cacheTime < CACHE_TTL) return cachedIndex
  cachedIndex = await buildIndex()
  cacheTime = Date.now()
  return cachedIndex
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q')?.trim() ?? ''

    if (!q) return NextResponse.json({ results: [] })

    const index = await getIndex()
    const results = index.search(q).slice(0, 10)

    return NextResponse.json({ results })
  } catch (err) {
    console.error('Search error:', err)
    return NextResponse.json({ results: [] })
  }
}
