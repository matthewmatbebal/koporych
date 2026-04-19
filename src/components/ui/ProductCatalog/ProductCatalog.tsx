'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProductCard } from '@/components/ui/ProductCard/ProductCard'
import type { Product } from '@/lib/products'
import styles from './ProductCatalog.module.sass'

interface ProductCatalogProps {
  products: Product[]
  /** Показывать кнопку «Все» как первый фильтр */
  allLabel?: string
  /** Ссылка «Весь каталог» внизу (опционально) */
  catalogLink?: string
}

export function ProductCatalog({ products, allLabel, catalogLink }: ProductCatalogProps) {
  const [active, setActive] = useState<string | null>(allLabel ? allLabel : null)

  const categories = Array.from(new Set(products.map(p => p.category)))
  const allCategories = allLabel ? [allLabel, ...categories] : categories

  const filtered = (!active || active === allLabel)
    ? products
    : products.filter(p => p.category === active)

  function handleClick(cat: string) {
    if (allLabel) {
      setActive(cat)
    } else {
      setActive(active === cat ? null : cat)
    }
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.categories}>
        {allCategories.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${active === cat ? styles.categoryBtnActive : ''}`}
            onClick={() => handleClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map(p => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Нет товаров в этой категории</p>
      )}
      {catalogLink && (
        <div className={styles.catalogLink}>
          <Link href={catalogLink} className="btn-outline btn">Весь каталог</Link>
        </div>
      )}
    </div>
  )
}
