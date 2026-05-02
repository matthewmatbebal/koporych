'use client'

import cn from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { SITE } from '@/lib/mock/site'
import styles from './MobileMenu.module.sass'

interface MobileMenuProps {
    isLight: boolean
}

export function MobileMenu({ isLight }: MobileMenuProps) {
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
                {SITE.nav.map(link => {
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
            </div>

            {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
        </>
    )
}
