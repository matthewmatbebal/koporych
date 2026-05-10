'use client'

import cn from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './MobileMenu.module.sass'

interface NavItem {
    href: string
    label: string
}

interface MobileMenuProps {
    isLight: boolean
    nav: NavItem[]
    phone: string
    phoneHref: string
}

export function MobileMenu({ isLight, nav, phone, phoneHref }: MobileMenuProps) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                className={cn(styles.burgerBtn, { [styles.burgerOpen]: open, [styles.light]: isLight })}
                onClick={() => setOpen(v => !v)}
                aria-label="Меню"
            >
                <span />
                <span />
                <span />
            </button>

            <div className={cn(styles.dropdown, { [styles.dropdownOpen]: open })}>
                {nav.map(link => {
                    const isActive = pathname.startsWith(link.href)
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(styles.link, { [styles.linkActive]: isActive })}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    )
                })}
                <div className={styles.divider} />
                <a href={phoneHref} className={styles.phone}>
                    {phone}
                </a>
            </div>

            {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
        </>
    )
}
