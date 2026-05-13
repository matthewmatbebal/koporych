'use client'

import cn from 'classnames'
import type { Product } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { QuantityCounter } from '@/components/ui/QuantityCounter/QuantityCounter'
import styles from './AddToCartButton.module.sass'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items, updateQuantity, removeItem } = useCartStore()
  const cartItem = items.find(i => i.id === product.slug)
  const qty = cartItem?.quantity ?? 0

  const productData = {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    price: parseInt(product.price.replace(/\D/g, ''), 10),
    weight: product.weight,
    image: product.images[0] ?? '',
  }

  function handleCounterChange(v: number) {
    if (v < 0) return
    if (v === 0) {
      if (cartItem) removeItem(cartItem.id)
    } else if (cartItem) {
      updateQuantity(cartItem.id, v)
    } else {
      addItem({ ...productData, quantity: v })
      if (typeof window.ym === 'function') window.ym(109184312, 'reachGoal', 'cart_add')
    }
  }

  return (
    <div className={styles.wrap}>
      <QuantityCounter value={qty} onChange={handleCounterChange} />
      <button
        className={cn('btn', 'btn-outline', styles.btn)}
        onClick={() => {
          if (qty > 0) {
            removeItem(productData.id)
          } else {
            addItem({ ...productData, quantity: 1 })
            if (typeof window.ym === 'function') window.ym(109184312, 'reachGoal', 'cart_add')
          }
        }}
      >
        {qty > 0 ? 'Убрать из корзины' : 'Добавить в корзину'}
      </button>
    </div>
  )
}
