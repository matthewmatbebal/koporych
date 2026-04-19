import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import type { Product } from '@/lib/products'
import styles from './ProductCard.module.sass'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/catalog/${product.slug}`} className={styles.card}>
      <div className={styles.cardPhoto}>
        <WireBlock label="Фото" height="100%" />
        <span className={styles.cardTag}>{product.category}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{product.name}</h3>
        <p className={styles.cardSub}>{product.sub}</p>
        <div className={styles.cardFooter}>
          <span className={styles.price}>{product.price}</span>
          <button className="btn" onClick={e => e.preventDefault()}>В корзину</button>
        </div>
      </div>
    </Link>
  )
}
