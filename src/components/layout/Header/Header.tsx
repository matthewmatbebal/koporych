'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SITE } from '@/lib/mock/site'
import { MobileMenu } from '@/components/layout/MobileMenu/MobileMenu'
import { SearchModal } from '@/components/ui/SearchModal/SearchModal'
import { useCartStore } from '@/store/cartStore'
import styles from './Header.module.sass'

interface NavItem {
    href: string
    label: string
}

interface HeaderProps {
    nav: NavItem[]
    phone: string
    phoneHref: string
}

function CartIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden>
            <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11M20 7L18 3H6L4 7M20 7H4M20 7V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export function Header({ nav, phone, phoneHref }: HeaderProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [scrolled, setScrolled] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const cartWrapRef = useRef<HTMLDivElement>(null)
    const cartCount = useCartStore(state => state.totalCount())

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 20)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (cartWrapRef.current && !cartWrapRef.current.contains(e.target as Node)) {
                setPopupOpen(false)
            }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [])

    function handleCartClick() {
        if (cartCount === 0) {
            setPopupOpen(o => !o)
        } else {
            setPopupOpen(false)
            router.push('/cart')
        }
    }

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
                    {nav.map(link => {
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
                    <button className={styles.searchBtn} onClick={() => setSearchOpen(true)}>Поиск</button>
                    <a href={phoneHref} className={styles.phoneBtn}>
                        {phone}
                    </a>
                    <div ref={cartWrapRef} className={styles.cartWrap}>
                        <button
                            className={styles.cartBtn}
                            aria-label="Корзина"
                            onClick={handleCartClick}
                        >
                            <CartIcon />
                            <span className={styles.cartCount}>{cartCount}</span>
                        </button>
                        <div className={cn(styles.cartPopup, { [styles.cartPopupOpen]: popupOpen })}>
                            <span className={styles.cartPopupText}>Корзина пуста</span>
                            <Link href="/catalog" className={styles.cartPopupLink} onClick={() => setPopupOpen(false)}>
                                В каталог
                            </Link>
                        </div>
                    </div>
                    <div className={styles.mobileOnly}>
                        <MobileMenu isLight={isLight} nav={nav} phone={phone} phoneHref={phoneHref} />
                    </div>
                </div>
            </div>
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </header>
    )
}
