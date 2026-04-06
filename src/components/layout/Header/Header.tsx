import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './Header.module.sass'

const NAV_LINKS = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О нас' },
  { href: '/delivery', label: 'Доставка и оплата' },
  { href: '/cooperation', label: 'Сотрудничество' },
  { href: '/contacts', label: 'Контакты' },
] as const

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>КОПОРЫЧ</Link>
        <nav className={styles.nav}>
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <WireBlock label="Поиск" height={36} className={styles.iconBtn} />
          <Link href="/cart">
            <WireBlock label="Корзина 0" height={36} className={styles.iconBtn} />
          </Link>
        </div>
      </div>
    </header>
  )
}
