import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/lib/mock/site'
import styles from './Footer.module.sass'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Image src={SITE.logo} alt="" width={40} height={40} />
              {SITE.name}
            </Link>
            <p className={styles.tagline}>{SITE.footer.tagline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}</p>
          </div>
          <nav className={styles.nav}>
            {SITE.nav.map(link => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.contacts}>
            <a href={SITE.contacts.phoneHref}>{SITE.contacts.phone}</a>
            <a href={SITE.contacts.emailHref}>{SITE.contacts.email}</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>{SITE.footer.copyright}</p>
          <div className={styles.socials}>
            <a href={SITE.socials.vk.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{SITE.socials.vk.label}</a>
            <a href={SITE.socials.telegram.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{SITE.socials.telegram.label}</a>
            <a href={SITE.socials.whatsapp.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{SITE.socials.whatsapp.label}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
