export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { M_PLUS_1p } from 'next/font/google'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { getSiteData, getExcursionsPage } from '@/lib/payload/globals'
import { SITE } from '@/lib/mock/site'
import './globals.sass'

const mPlus1p = M_PLUS_1p({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'Копорыч — иван-чай ручной сборки',
  description: 'Традиционный русский чай из иван-чая',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [siteData, excursionsPage] = await Promise.all([
    getSiteData(),
    getExcursionsPage(),
  ])

  const nav = [
    ...SITE.nav,
    ...(excursionsPage.enabled ? [{ href: '/excursions', label: 'Экскурсии' }] : []),
  ]

  return (
    <html lang="ru" className={mPlus1p.className}>
      <body>
        <Header nav={nav} phone={siteData.contacts.phone} phoneHref={siteData.contacts.phoneHref} />
        <main>{children}</main>
        <Footer nav={nav} siteData={siteData} />
      </body>
    </html>
  )
}
