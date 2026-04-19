import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import { CustomSelect } from '@/components/ui/CustomSelect/CustomSelect'
import styles from './page.module.sass'

const CART_ITEMS = [
  { name: 'Иван-чай классический', weight: '100 г', qty: 1, price: '450 ₽' },
  { name: 'Иван-чай с чабрецом', weight: '80 г', qty: 2, price: '760 ₽' },
]

export default function CartPage() {
  return (
    <div className={styles.page}>

      <h1>Корзина</h1>

      <div className={styles.cartSection}>
        <div className={styles.items}>
          {CART_ITEMS.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemPhoto}>
                <WireBlock label="Фото" height={72} />
              </div>
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
          <span>Итого (без учёта доставки)</span>
          <strong>1 210 ₽</strong>
        </div>
      </div>

      <div className={styles.orderSection}>
        <h2>Оформление заказа</h2>
        <form className={styles.form}>
          <label className={styles.field}>
            <input type="email" placeholder=" " className={styles.input} />
            <span className={styles.label}>E-mail</span>
          </label>
          <label className={styles.field}>
            <input type="text" placeholder=" " className={styles.input} />
            <span className={styles.label}>ФИО или Компания</span>
          </label>
          <label className={styles.field}>
            <input type="tel" placeholder=" " className={styles.input} />
            <span className={styles.label}>Телефон</span>
          </label>
          <CustomSelect
            label="Способ доставки"
            options={['Почта России', 'СДЭК', 'Яндекс.Доставка', 'Самовывоз']}
            name="delivery"
          />
          <label className={styles.field}>
            <input type="text" placeholder=" " className={styles.input} />
            <span className={styles.label}>Адрес доставки</span>
          </label>
          <CustomSelect
            label="Способ оплаты"
            options={['Банковская карта', 'Перевод на счёт', 'Наличные при самовывозе']}
            name="payment"
          />
          <label className={`${styles.field} ${styles.fieldTextarea}`}>
            <textarea placeholder=" " rows={3} className={styles.input} />
            <span className={styles.label}>Комментарий к заказу (необязательно)</span>
          </label>
          <button type="submit" className={`btn ${styles.submit}`}>Оформить заказ</button>
        </form>
      </div>


    </div>
  )
}
