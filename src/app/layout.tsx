import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import './globals.sass'

export const metadata: Metadata = {
  title: 'Копорыч — иван-чай ручной сборки',
  description: 'Традиционный русский чай из иван-чая',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
