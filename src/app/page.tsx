import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

const FEATURED = [
  { href: '/catalog/ivan-chai-classic', name: 'Иван-чай классический', desc: 'Рассыпной, ручной сбор, 100 г', price: '450 ₽' },
  { href: '/catalog/ivan-chai-thyme', name: 'Иван-чай с чабрецом', desc: 'С добавлением чабреца, 80 г', price: '380 ₽' },
  { href: '/catalog/ivan-chai-pyramids', name: 'Иван-чай в пирамидках', desc: 'Удобно заваривать, 20 пирамидок', price: '420 ₽' },
]

export default function HomePage() {
  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <WireBlock label="Фото" height={480} className={styles.heroBg} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Копорыч</h1>
          <p className={styles.heroSubtitle}>Иван-чай ручной сборки из экологически чистых мест России</p>
          <Link href="/catalog" className="btn">Перейти в каталог</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.categories}>
          <button className={styles.categoryBtn}>Рассыпной</button>
          <button className={styles.categoryBtn}>Пирамидки</button>
          <button className={styles.categoryBtn}>Развес</button>
        </div>
        <h2>Избранные товары</h2>
        <div className={styles.grid3}>
          {FEATURED.map(p => (
            <Link key={p.href} href={p.href} className={styles.card}>
              <WireBlock label="Фото" height={220} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{p.name}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.price}>{p.price}</span>
                  <button className="btn">В корзину</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.aboutSection}>
        <WireBlock className={styles.photo} label="Фото" height={360} />
        <div className={styles.aboutInner}>
          <h2>Мы делаем чай с душой</h2>
          <p>Мы собираем иван-чай вручную в экологически чистых местах Ленинградской и Вологодской областей. Традиционная ферментация придаёт чаю насыщенный вкус и аромат.</p>
          <Link href="/about" className="btn">О нас</Link>
        </div>
      </section>

      <section className={styles.sectionMuted}>
        <p>С нами сотрудничают — логотипы партнёров</p>
      </section>

    </div>
  )
}
