'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SITE } from '@/lib/mock/site'
import { MobileMenu } from '@/components/layout/MobileMenu/MobileMenu'
import styles from './Header.module.sass'

function CartIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden>
            <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11M20 7L18 3H6L4 7M20 7H4M20 7V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

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
    const isLight = isHome && !scrolled

    return (
        <header className={cn(styles.header, {
            [styles.headerScrolled]: scrolled,
            [styles.headerLight]: isLight,
        })}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo}>
                    <Image src={isLight ? SITE.logoBold : SITE.logo} alt="" width={40} height={40} className={styles.logoIcon} />
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
                    <Link href="/cart" className={styles.cartBtn} aria-label="Корзина">
                        <CartIcon />
                        <span className={styles.cartCount}>0</span>
                    </Link>
                    <div className={styles.mobileOnly}>
                        <MobileMenu isLight={isLight} />
                    </div>
                </div>
            </div>
        </header>
    )
}
