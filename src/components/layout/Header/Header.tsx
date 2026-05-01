'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SITE } from '@/lib/mock/site'
import styles from './Header.module.sass'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <header className={cn(styles.header, {
      [styles.headerScrolled]: scrolled,
      [styles.headerLight]: isHome && !scrolled,
    })}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image src={isHome && !scrolled ? SITE.logoBold : SITE.logo} alt="" width={40} height={40} className={styles.logoIcon} />
          {SITE.name}
        </Link>
        <nav className={styles.nav}>
          {SITE.nav.map(link => {
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
