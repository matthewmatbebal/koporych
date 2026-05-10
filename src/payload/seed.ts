import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'
import { SITE } from '@/lib/mock/site'
import { ABOUT_PAGE } from '@/lib/mock/about'
import { HOME_PAGE } from '@/lib/mock/home'
import { COOPERATION_PAGE } from '@/lib/mock/cooperation'
import { DELIVERY_PAGE } from '@/lib/mock/delivery'
import { CONTACTS_PAGE } from '@/lib/mock/contacts'
import { PRODUCTS } from '@/lib/products'

// ─── Helpers ─────────────────────────────────────────────

function getMimetype(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  const map: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  }
  return map[ext] ?? 'application/octet-stream'
}

async function uploadImage(
  payload: Payload,
  publicPath: string,
  alt: string,
): Promise<number | null> {
  // publicPath = '/images/products/classic-1.svg'
  if (path.extname(publicPath).toLowerCase() === '.svg') return null

  const filePath = path.join(process.cwd(), 'public', publicPath)
  if (!fs.existsSync(filePath)) {
    console.warn(`[seed] File not found: ${filePath}`)
    return null
  }
  const data = fs.readFileSync(filePath)
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: getMimetype(filePath),
      name: path.basename(filePath),
      size: data.length,
    },
    overrideAccess: true,
  })
  return doc.id as number
}

// ─── Main seed function ───────────────────────────────────

export async function runSeed(payload: Payload): Promise<{ message: string }> {
  // ── Guard: skip if products already exist ──────────────
  const existing = await payload.find({ collection: 'products', limit: 1 })
  if (existing.docs.length > 0) {
    return { message: 'Already seeded — skipping' }
  }

  console.log('[seed] Starting...')

  // ── 1. Upload category images ──────────────────────────
  const categoryImagePaths: Record<string, string> = {
    'Рассыпной': '/images/grass.jpg',
    'Пирамидки': '/images/pyramids.jpg',
    'Развес': '/images/classic.jpg',
  }

  const categoryMediaIds: Record<string, number> = {}
  for (const [name, imgPath] of Object.entries(categoryImagePaths)) {
    const id = await uploadImage(payload, imgPath, name)
    if (id) categoryMediaIds[name] = id
  }
  console.log('[seed] Category images uploaded')

  // ── 2. Create categories ───────────────────────────────
  const categoryIds: Record<string, number> = {}
  for (const name of Object.keys(categoryImagePaths)) {
    const doc = await payload.create({
      collection: 'categories',
      data: { name, image: categoryMediaIds[name] ?? null },
      overrideAccess: true,
    })
    categoryIds[name] = doc.id as number
  }
  console.log('[seed] Categories created')

  // ── 3. Upload product images ───────────────────────────
  // Collect unique image paths from all products
  const allProductImages = Array.from(
    new Set(PRODUCTS.flatMap(p => p.images))
  )
  const productMediaIds: Record<string, number> = {}
  for (const imgPath of allProductImages) {
    const id = await uploadImage(payload, imgPath, path.basename(imgPath, path.extname(imgPath)))
    if (id) productMediaIds[imgPath] = id
  }
  console.log('[seed] Product images uploaded')

  // ── 4. Create products ─────────────────────────────────
  for (const p of PRODUCTS) {
    const priceNum = parseInt(p.price.replace(/\D/g, ''), 10)
    await payload.create({
      collection: 'products',
      data: {
        slug: p.slug,
        name: p.name,
        sub: p.sub,
        description: p.description,
        price: isNaN(priceNum) ? 0 : priceNum,
        weight: p.weight,
        category: categoryIds[p.category] ?? null,
        featured: p.featured ?? false,
        images: p.images
          .filter(img => productMediaIds[img])
          .map(img => ({ image: productMediaIds[img] })),
      },
      overrideAccess: true,
    })
  }
  console.log('[seed] Products created')

  // ── 5. Upload page images ──────────────────────────────
  const aboutMainId = await uploadImage(payload, HOME_PAGE.aboutPreview.image, 'About preview')
  const bannerMediaId = await uploadImage(payload, HOME_PAGE.hero.image, 'Hero banner')
  const cooperationPhotoId = await uploadImage(payload, COOPERATION_PAGE.photo, 'Сотрудничество')
  const deliveryHeroId = await uploadImage(payload, DELIVERY_PAGE.hero.image, 'Доставка')

  // About page: main photo + stage photos
  const aboutMainPhotoId = await uploadImage(payload, ABOUT_PAGE.company.photos[0], 'О нас — главное фото')
  const stageMediaIds: number[] = []
  for (const stage of ABOUT_PAGE.company.stages) {
    const id = await uploadImage(payload, stage.photo, 'Этап производства')
    stageMediaIds.push(id ?? 0)
  }
  console.log('[seed] Page images uploaded')

  // ── 6. Populate globals ────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: SITE.name,
      contacts: {
        phone: SITE.contacts.phone,
        email: SITE.contacts.email,
        address: SITE.contacts.address,
      },
      socials: {
        vk: SITE.socials.vk.url,
        telegram: SITE.socials.telegram.url,
        whatsapp: SITE.socials.whatsapp.url,
      },
      footer: {
        tagline: SITE.footer.tagline,
        copyright: SITE.footer.copyright,
      },
    },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        image: bannerMediaId ?? null,
        title: HOME_PAGE.hero.title,
        buttonText: HOME_PAGE.hero.buttonText,
        buttonHref: HOME_PAGE.hero.buttonHref,
      },
      aboutPreview: {
        image: aboutMainId ?? null,
        eyebrow: HOME_PAGE.aboutPreview.eyebrow,
        title: HOME_PAGE.aboutPreview.title,
        text: HOME_PAGE.aboutPreview.text,
        buttonText: HOME_PAGE.aboutPreview.buttonText,
        buttonHref: HOME_PAGE.aboutPreview.buttonHref,
      },
      partners: { enabled: false },
    },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      company: {
        photo: aboutMainPhotoId ?? null,
        title: ABOUT_PAGE.company.title,
        intro: ABOUT_PAGE.company.intro,
        stages: ABOUT_PAGE.company.stages.map((s, i) => ({
          photo: stageMediaIds[i] || null,
          text: s.text,
        })),
      },
      mission: {
        quote: ABOUT_PAGE.mission.quote,
        source: ABOUT_PAGE.mission.source,
      },
      video: {
        src: ABOUT_PAGE.video.src,
        title: ABOUT_PAGE.video.title,
        text: ABOUT_PAGE.video.text,
      },
    },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'cooperation-page',
    data: {
      photo: cooperationPhotoId ?? null,
      title: COOPERATION_PAGE.title,
      intro: COOPERATION_PAGE.intro,
      items: COOPERATION_PAGE.items,
      outro: COOPERATION_PAGE.outro,
    },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'delivery-page',
    data: {
      hero: {
        image: deliveryHeroId ?? null,
        title: DELIVERY_PAGE.hero.title,
        subtitle: DELIVERY_PAGE.hero.subtitle,
      },
      deliveryMethods: DELIVERY_PAGE.deliveryMethods,
      paymentMethods: DELIVERY_PAGE.paymentMethods,
      requisites: DELIVERY_PAGE.requisites,
    },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'contacts-page',
    data: { title: CONTACTS_PAGE.title },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'excursions-page',
    data: { enabled: false },
    overrideAccess: true,
  })

  console.log('[seed] Globals populated')
  console.log('[seed] Done!')
  return { message: 'Seed completed successfully' }
}
