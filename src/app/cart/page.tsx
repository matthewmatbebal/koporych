import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

const CART_ITEMS = [
  { name: 'Иван-чай классический', weight: '100 г', qty: 1, price: '450 ₽' },
  { name: 'Иван-чай с чабрецом', weight: '80 г', qty: 2, price: '760 ₽' },
]

export default function CartPage() {
  return (
    <div className={styles.page}>

      <h1>Корзина</h1>

      <div className={styles.items}>
        {CART_ITEMS.map((item, i) => (
          <div key={i} className={styles.item}>
            <WireBlock label="Фото" height={72} className={styles.itemPhoto} />
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemWeight}>{item.weight}</span>
            </div>
            <div className={styles.itemControls}>
              <button className={styles.counterBtn}>−</button>
              <span className={styles.counterVal}>{item.qty}</span>
              <button className={styles.counterBtn}>+</button>
            </div>
            <span className={styles.itemPrice}>{item.price}</span>
            <button className={styles.removeBtn}>✕</button>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <span>Итого (без учёта доставки):</span>
        <strong>1 210 ₽</strong>
      </div>

      <h2>Оформление заказа</h2>

      <form className={styles.form}>
        <input type="email" placeholder="E-mail" />
        <input type="text" placeholder="ФИО или Компания" />
        <input type="tel" placeholder="Телефон" />
        <select>
          <option value="">Способ доставки</option>
          <option>Почта России</option>
          <option>СДЭК</option>
          <option>Яндекс.Доставка</option>
          <option>Самовывоз</option>
        </select>
        <input type="text" placeholder="Адрес доставки" />
        <select>
          <option value="">Способ оплаты</option>
          <option>Банковская карта</option>
          <option>Перевод на счёт</option>
          <option>Наличные при самовывозе</option>
        </select>
        <textarea placeholder="Комментарий к заказу (необязательно)" rows={3} />
        <button type="submit" className="btn">Оформить заказ</button>
      </form>

      <div className={styles.emptyState}>
        <p>Корзина пуста</p>
        <Link href="/catalog" className="btn">Перейти в каталог</Link>
      </div>

    </div>
  )
}
