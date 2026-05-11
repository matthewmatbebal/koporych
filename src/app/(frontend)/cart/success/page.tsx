'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import styles from './success.module.sass'

export default function OrderSuccessPage() {
  const router = useRouter()
  const { lastOrder, clearLastOrder } = useCartStore()

  if (!lastOrder) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1>Заказ не найден</h1>
          <p className={styles.sub}>Возможно, вы уже вернулись из этой страницы.</p>
          <Link href="/catalog" className="btn btn-outline">В каталог</Link>
        </div>
      </div>
    )
  }

  function handleBack() {
    clearLastOrder()
    router.push('/catalog')
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.icon}>✓</div>
        <h1>Заказ оформлен!</h1>
        <p className={styles.orderNumber}>{lastOrder.orderNumber}</p>
        <p className={styles.sub}>
          {lastOrder.customer.name}, мы свяжемся с вами по номеру <b>{lastOrder.customer.phone}</b> в ближайшее время.
          <br />Подтверждение заказа отправлено на {lastOrder.customer.email}.
        </p>

        <div className={styles.items}>
          {lastOrder.items.map(item => (
            <div key={item.id} className={styles.item}>
              <span className={styles.itemName}>{item.name} {item.weight && `(${item.weight})`}</span>
              <span className={styles.itemQty}>× {item.quantity}</span>
              <span className={styles.itemPrice}>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
            </div>
          ))}
          <div className={styles.total}>
            <span>Итого (без доставки)</span>
            <strong>{lastOrder.total.toLocaleString('ru-RU')} ₽</strong>
          </div>
        </div>

        <button className="btn btn-outline" onClick={handleBack}>
          Вернуться в каталог
        </button>
      </div>
    </div>
  )
}
