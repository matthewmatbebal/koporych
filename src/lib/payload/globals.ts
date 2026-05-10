import { SITE } from '@/lib/mock/site'
import { ABOUT_PAGE } from '@/lib/mock/about'
import { HOME_PAGE } from '@/lib/mock/home'
import { COOPERATION_PAGE } from '@/lib/mock/cooperation'
import { DELIVERY_PAGE } from '@/lib/mock/delivery'
import { CONTACTS_PAGE } from '@/lib/mock/contacts'
import { getPayloadClient } from './client'

// ─── Типы ────────────────────────────────────────────────

export interface SiteData {
  siteName: string
  contacts: {
    phone: string
    phoneHref: string
    email: string
    emailHref: string
    address: string
  }
  socials: {
    vk: { label: string; url: string }
    telegram: { label: string; url: string }
    whatsapp: { label: string; url: string }
  }
  footer: {
    tagline: string
    copyright: string
  }
}

export interface ExcursionsData {
  enabled: boolean
  hero: { image: string; title: string; subtitle: string }
  events: { photo: string; caption: string; description: string }[]
}

export interface HomePageData {
  hero: { image: string; title: string; buttonText: string; buttonHref: string }
  aboutPreview: { image: string; eyebrow: string; title: string; text: string; buttonText: string; buttonHref: string }
  featured: { title: string; catalogLink: string }
  partners: { enabled: boolean }
}

export interface AboutPageData {
  company: {
    photos: string[]
    title: string
    intro: string
    facts: { value: string; label: string }[]
    stages: { photo: string; text: string }[]
  }
  mission: { quote: string; source: string }
  video: { src: string; title: string; text: string }
}

export interface CooperationPageData {
  photo: string
  title: string
  intro: string
  items: { label: string; description: string }[]
  outro: string
}

export interface DeliveryPageData {
  hero: { image: string; title: string; subtitle: string }
  deliveryMethods: { name: string; meta: string }[]
  paymentMethods: { name: string; meta: string }[]
  requisites: { companyName: string; inn: string; ogrnip: string; bankAccount: string; bank: string }
}

// ─── Helpers ─────────────────────────────────────────────

function mediaUrl(field: any): string {
  return typeof field === 'object' && field ? (field.url ?? '') : ''
}

function buildPhoneHref(phone: string): string {
  return 'tel:+' + phone.replace(/\D/g, '')
}

// Гарантирует тип string: берёт значение из Payload если строка, иначе fallback
function str(val: any, fallback: string): string {
  return typeof val === 'string' ? val : fallback
}

const SITE_FALLBACK: SiteData = {
  siteName: SITE.name,
  contacts: SITE.contacts,
  socials: SITE.socials,
  footer: SITE.footer,
}

// ─── SiteSettings ────────────────────────────────────────

export async function getSiteData(): Promise<SiteData> {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'site-settings' })

    if (!data.contacts?.phone) return SITE_FALLBACK

    const phone = str(data.contacts.phone, SITE.contacts.phone)
    const email = str(data.contacts.email, SITE.contacts.email)

    return {
      siteName: str(data.siteName, SITE.name),
      contacts: {
        phone,
        phoneHref: buildPhoneHref(phone),
        email,
        emailHref: `mailto:${email}`,
        address: str(data.contacts.address, SITE.contacts.address),
      },
      socials: {
        vk: { label: SITE.socials.vk.label, url: str(data.socials?.vk, SITE.socials.vk.url) },
        telegram: { label: SITE.socials.telegram.label, url: str(data.socials?.telegram, SITE.socials.telegram.url) },
        whatsapp: { label: SITE.socials.whatsapp.label, url: str(data.socials?.whatsapp, SITE.socials.whatsapp.url) },
      },
      footer: {
        tagline: str(data.footer?.tagline, SITE.footer.tagline),
        copyright: str(data.footer?.copyright, SITE.footer.copyright),
      },
    }
  } catch {
    return SITE_FALLBACK
  }
}

// ─── HomePage ─────────────────────────────────────────────

export async function getHomePage(): Promise<HomePageData> {
  const fallback: HomePageData = {
    hero: HOME_PAGE.hero,
    aboutPreview: HOME_PAGE.aboutPreview,
    featured: { title: HOME_PAGE.featured.title, catalogLink: HOME_PAGE.featured.catalogLink },
    partners: { enabled: false },
  }

  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'home-page', depth: 1 })

    if (!data.hero?.title) return fallback

    return {
      hero: {
        image: mediaUrl(data.hero.image) || HOME_PAGE.hero.image,
        title: str(data.hero.title, HOME_PAGE.hero.title),
        buttonText: str(data.hero.buttonText, HOME_PAGE.hero.buttonText),
        buttonHref: str(data.hero.buttonHref, HOME_PAGE.hero.buttonHref),
      },
      aboutPreview: {
        image: mediaUrl(data.aboutPreview?.image) || HOME_PAGE.aboutPreview.image,
        eyebrow: str(data.aboutPreview?.eyebrow, HOME_PAGE.aboutPreview.eyebrow),
        title: str(data.aboutPreview?.title, HOME_PAGE.aboutPreview.title),
        text: str(data.aboutPreview?.text, HOME_PAGE.aboutPreview.text),
        buttonText: str(data.aboutPreview?.buttonText, HOME_PAGE.aboutPreview.buttonText),
        buttonHref: str(data.aboutPreview?.buttonHref, HOME_PAGE.aboutPreview.buttonHref),
      },
      featured: {
        title: HOME_PAGE.featured.title,
        catalogLink: HOME_PAGE.featured.catalogLink,
      },
      partners: {
        enabled: data.partners?.enabled === true,
      },
    }
  } catch {
    return fallback
  }
}

// ─── AboutPage ────────────────────────────────────────────

export async function getAboutPage(): Promise<AboutPageData> {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'about-page', depth: 1 })

    if (!data.company?.title) return ABOUT_PAGE

    return {
      company: {
        photos: mediaUrl(data.company.photo)
          ? [mediaUrl(data.company.photo)]
          : ABOUT_PAGE.company.photos,
        title: str(data.company.title, ABOUT_PAGE.company.title),
        intro: str(data.company.intro, ABOUT_PAGE.company.intro),
        facts: ABOUT_PAGE.company.facts,
        stages: (data.company.stages ?? []).map((s: any) => ({
          photo: mediaUrl(s.photo),
          text: str(s.text, ''),
        })),
      },
      mission: {
        quote: str(data.mission?.quote, ABOUT_PAGE.mission.quote),
        source: str(data.mission?.source, ABOUT_PAGE.mission.source),
      },
      video: {
        src: str(data.video?.src, ABOUT_PAGE.video.src),
        title: str(data.video?.title, ABOUT_PAGE.video.title),
        text: str(data.video?.text, ABOUT_PAGE.video.text),
      },
    }
  } catch {
    return ABOUT_PAGE
  }
}

// ─── CooperationPage ──────────────────────────────────────

export async function getCooperationPage(): Promise<CooperationPageData> {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'cooperation-page', depth: 1 })

    if (!data.title) return COOPERATION_PAGE

    return {
      photo: mediaUrl(data.photo) || COOPERATION_PAGE.photo,
      title: str(data.title, COOPERATION_PAGE.title),
      intro: str(data.intro, COOPERATION_PAGE.intro),
      items: (data.items ?? []).map((item: any) => ({
        label: str(item.label, ''),
        description: str(item.description, ''),
      })),
      outro: str(data.outro, COOPERATION_PAGE.outro),
    }
  } catch {
    return COOPERATION_PAGE
  }
}

// ─── DeliveryPage ─────────────────────────────────────────

export async function getDeliveryPage(): Promise<DeliveryPageData> {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'delivery-page', depth: 1 })

    if (!data.hero?.title) return DELIVERY_PAGE

    return {
      hero: {
        image: mediaUrl(data.hero.image) || DELIVERY_PAGE.hero.image,
        title: str(data.hero.title, DELIVERY_PAGE.hero.title),
        subtitle: str(data.hero.subtitle, DELIVERY_PAGE.hero.subtitle),
      },
      deliveryMethods: (data.deliveryMethods ?? []).map((m: any) => ({
        name: str(m.name, ''),
        meta: str(m.meta, ''),
      })),
      paymentMethods: (data.paymentMethods ?? []).map((m: any) => ({
        name: str(m.name, ''),
        meta: str(m.meta, ''),
      })),
      requisites: {
        companyName: str(data.requisites?.companyName, DELIVERY_PAGE.requisites.companyName),
        inn: str(data.requisites?.inn, DELIVERY_PAGE.requisites.inn),
        ogrnip: str(data.requisites?.ogrnip, DELIVERY_PAGE.requisites.ogrnip),
        bankAccount: str(data.requisites?.bankAccount, DELIVERY_PAGE.requisites.bankAccount),
        bank: str(data.requisites?.bank, DELIVERY_PAGE.requisites.bank),
      },
    }
  } catch {
    return DELIVERY_PAGE
  }
}

// ─── ContactsPage ─────────────────────────────────────────

export async function getContactsPage(): Promise<{ title: string }> {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'contacts-page' })
    return { title: str(data.title, CONTACTS_PAGE.title) }
  } catch {
    return CONTACTS_PAGE
  }
}

// ─── ExcursionsPage ───────────────────────────────────────

export async function getExcursionsPage(): Promise<ExcursionsData> {
  const fallback: ExcursionsData = {
    enabled: false,
    hero: { image: '', title: '', subtitle: '' },
    events: [],
  }

  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'excursions-page', depth: 1 })

    return {
      enabled: data.enabled === true,
      hero: {
        image: mediaUrl(data.hero?.image),
        title: str(data.hero?.title, ''),
        subtitle: str(data.hero?.subtitle, ''),
      },
      events: (data.events ?? []).map((e: any) => ({
        photo: mediaUrl(e.photo),
        caption: str(e.caption, ''),
        description: str(e.description, ''),
      })),
    }
  } catch {
    return fallback
  }
}
