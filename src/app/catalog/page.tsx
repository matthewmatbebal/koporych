'use client'

import { useState } from 'react'
import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

const CATEGORIES = ['Все', 'Рассыпной', 'Пирамидки', 'Развес']

const PRODUCTS = [
  { slug: 'ivan-chai-classic', name: 'Иван-чай классический', weight: '100 г', price: '450 ₽', category: 'Рассыпной' },
  { slug: 'ivan-chai-thyme', name: 'Иван-чай с чабрецом', weight: '80 г', price: '380 ₽', category: 'Рассыпной' },
  { slug: 'ivan-chai-pyramids', name: 'Иван-чай в пирамидках', weight: '20 шт', price: '420 ₽', category: 'Пирамидки' },
  { slug: 'ivan-chai-mint', name: 'Иван-чай с мятой', weight: '80 г', price: '360 ₽', category: 'Рассыпной' },
  { slug: 'ivan-chai-raspberry', name: 'Иван-чай с малиной', weight: '80 г', price: '390 ₽', category: 'Рассыпной' },
  { slug: 'ivan-chai-lemon', name: 'Иван-чай с лимоном', weight: '80 г', price: '370 ₽', category: 'Рассыпной' },
  { slug: 'ivan-chai-bulk-200', name: 'Иван-чай рассыпной', weight: '200 г', price: '790 ₽', category: 'Развес' },
  { slug: 'ivan-chai-bulk-500', name: 'Иван-чай рассыпной', weight: '500 г', price: '1 800 ₽', category: 'Развес' },
  { slug: 'ivan-chai-gift', name: 'Подарочный набор', weight: '3 × 50 г', price: '890 ₽', category: 'Набор' },
]

export default function CatalogPage() {
  const [active, setActive] = useState('Все')

  const filtered = active === 'Все' ? PRODUCTS : PRODUCTS.filter(p => p.category === active)

  return (
    <div className={styles.page}>
      <h1>Каталог</h1>
      <div className={styles.categories}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${active === cat ? styles.categoryBtnActive : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map(p => (
          <Link key={p.slug} href={`/catalog/${p.slug}`} className={styles.card}>
            <div className={styles.cardPhoto}>
              <WireBlock label="Фото" height="100%" />
              <span className={styles.cardTag}>{p.category}</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardName}>{p.name}</h3>
              <p className={styles.cardWeight}>{p.weight}</p>
              <div className={styles.cardFooter}>
                <span className={styles.price}>{p.price}</span>
                <button className="btn">В корзину</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
