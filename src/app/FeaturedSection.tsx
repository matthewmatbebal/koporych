'use client'

import Link from 'next/link'
import { useState } from 'react'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

const FEATURED = [
  { href: '/catalog/ivan-chai-classic', name: 'Иван-чай классический', desc: 'Рассыпной · ручной сбор · 100 г', price: '450 ₽', category: 'Рассыпной' },
  { href: '/catalog/ivan-chai-thyme', name: 'Иван-чай с чабрецом', desc: 'С добавлением чабреца · 80 г', price: '380 ₽', category: 'Рассыпной' },
  { href: '/catalog/ivan-chai-pyramids', name: 'Иван-чай в пирамидках', desc: 'Удобно заваривать · 20 пирамидок', price: '420 ₽', category: 'Пирамидки' },
]

const CATEGORIES = ['Рассыпной', 'Пирамидки', 'Развес']

export function FeaturedSection() {
  const [active, setActive] = useState<string | null>(null)

  const products = active ? FEATURED.filter(p => p.category === active) : FEATURED

  return (
    <section className={styles.section}>
      <h2>Избранные товары</h2>
      <div className={styles.categories}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${active === cat ? styles.categoryBtnActive : ''}`}
            onClick={() => setActive(active === cat ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.grid3}>
        {products.map(p => (
          <Link key={p.href} href={p.href} className={styles.card}>
            <div className={styles.cardPhoto}>
              <WireBlock label="Фото" height="100%" />
              <span className={styles.cardTag}>{p.category}</span>
            </div>
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
      <div className={styles.catalogLink}>
        <Link href="/catalog" className="btn-outline btn">Весь каталог</Link>
      </div>
    </section>
  )
}
