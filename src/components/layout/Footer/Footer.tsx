import Link from 'next/link'
import styles from './Footer.module.sass'

const NAV_LINKS = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О нас' },
  { href: '/cooperation', label: 'Сотрудничество' },
  { href: '/delivery', label: 'Доставка и оплата' },
  { href: '/contacts', label: 'Контакты' },
] as const

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>КОПОРЫЧ</Link>
            <p className={styles.tagline}>Иван-чай ручной сборки<br />из экологически чистых мест России</p>
          </div>
          <nav className={styles.nav}>
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.contacts}>
            <a href="tel:+79001234567">+7 (900) 123-45-67</a>
            <a href="mailto:hello@koporych.ru">hello@koporych.ru</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2024 Копорыч. Все права защищены.</p>
          <div className={styles.socials}>
            <a href="https://vk.com/koporych" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>ВКонтакте</a>
            <a href="https://t.me/koporych" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Telegram</a>
            <a href="https://wa.me/79001234567" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
