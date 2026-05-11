'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { QuantityCounter } from '@/components/ui/QuantityCounter/QuantityCounter'
import styles from './ProductCard.module.sass'

export function ProductCard({ product }: { product: Product }) {
  const { addItem, items, updateQuantity, removeItem } = useCartStore()
  const cartItem = items.find(i => i.id === product.slug)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem({
      id: product.slug,
      slug: product.slug,
      name: product.name,
      price: parseInt(product.price.replace(/\D/g, ''), 10),
      weight: product.weight,
      image: product.images[0] ?? '',
      quantity: 1,
    })
  }

  return (
    <Link href={`/catalog/${product.slug}`} className={styles.card}>
      <div className={styles.cardPhoto}>
        <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{product.name}</h3>
        <p className={styles.cardSub}>{product.sub}</p>
        <div className={styles.cardFooter}>
          <span className={styles.price}>{product.price}</span>
          <div className={styles.cartControls} onClick={e => { e.preventDefault(); e.stopPropagation() }}>
            {cartItem && (
              <QuantityCounter
                value={cartItem.quantity}
                onChange={v => {
                  if (v === 0) removeItem(cartItem.id)
                  else updateQuantity(cartItem.id, v)
                }}
              />
            )}
            <button
              className={cn('btn', 'btn-outline', styles.cartBtn)}
              onClick={cartItem ? () => removeItem(cartItem.id) : handleAdd}
            >
              {cartItem ? 'Убрать' : 'В корзину'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
