'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.sass'

const NAV_LINKS = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О нас' },
  { href: '/cooperation', label: 'Сотрудничество' },
  { href: '/delivery', label: 'Доставка и оплата' },
  { href: '/contacts', label: 'Контакты' },
] as const

export function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo.svg" alt="" width={40} height={40} className={styles.logoIcon} />
          КОПОРЫЧ
        </Link>
        <nav className={styles.nav}>
          {NAV_LINKS.map(link => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(styles.navLink, { [styles.navLinkActive]: isActive })}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className={styles.actions}>
          <button className={styles.searchBtn}>Поиск</button>
          <Link href="/cart" className={styles.cartBtn}>
            Корзина <span className={styles.cartCount}>0</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
