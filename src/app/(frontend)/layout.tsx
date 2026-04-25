import type { Metadata } from 'next'
import { M_PLUS_1p } from 'next/font/google'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import './globals.sass'

const mPlus1p = M_PLUS_1p({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'Копорыч — иван-чай ручной сборки',
  description: 'Традиционный русский чай из иван-чая',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={mPlus1p.className}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
