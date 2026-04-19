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
            <p>Иван-чай ручной сборки</p>
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
        </div>
      </div>
    </footer>
  )
}
