import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/lib/mock/site'
import type { SiteData } from '@/lib/payload/globals'
import styles from './Footer.module.sass'

interface NavItem {
    href: string
    label: string
}

interface FooterProps {
    nav: NavItem[]
    siteData: SiteData
}

export function Footer({ nav, siteData }: FooterProps) {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <Image src={SITE.logo} alt="" width={40} height={40} />
                            {siteData.siteName}
                        </Link>
                        <p className={styles.tagline}>{siteData.footer.tagline.split('\n').map((line, i) => (
                            <span key={i}>{line}{i === 0 && <br />}</span>
                        ))}</p>
                    </div>
                    <nav className={styles.nav}>
                        {nav.map(link => (
                            <Link key={link.href} href={link.href} className={styles.navLink}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className={styles.contacts}>
                        <a href={siteData.contacts.phoneHref}>{siteData.contacts.phone}</a>
                        <a href={siteData.contacts.emailHref}>{siteData.contacts.email}</a>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottomLeft}>
                        <p>{siteData.footer.copyright}</p>
                        <div className={styles.legal}>
                            <a href="/privacy" target="_blank" rel="noopener noreferrer" className={styles.legalLink}>Политика конфиденциальности</a>
                            <a href="/personal-data-agreement" target="_blank" rel="noopener noreferrer" className={styles.legalLink}>Политика обработки персональных данных</a>
                        </div>
                    </div>
                    <div className={styles.socials}>
                        <a href={siteData.socials.vk.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{siteData.socials.vk.label}</a>
                        <a href={siteData.socials.telegram.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{siteData.socials.telegram.label}</a>
                        <a href={siteData.socials.whatsapp.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{siteData.socials.whatsapp.label}</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
