import cn from 'classnames'
import Image from 'next/image'
import { CustomSelect } from '@/components/ui/CustomSelect/CustomSelect'
import { QuantityCounter } from '@/components/ui/QuantityCounter/QuantityCounter'
import { SITE } from '@/lib/mock/site'
import styles from './CartPage.module.sass'

const CART_ITEMS = [
  { name: 'Иван-чай классический', weight: '100 г', qty: 1, price: '450 ₽', image: '/images/classic.jpg' },
  { name: 'Иван-чай с чабрецом', weight: '80 г', qty: 2, price: '760 ₽', image: '/images/grass.jpg' },
]

export function CartPage() {
  return (
    <div className={styles.page}>

      <h1>Корзина</h1>

      <div className={styles.cartSection}>
        <div className={styles.items}>
          {CART_ITEMS.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemPhoto}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemWeight}>{item.weight}</span>
              </div>
              <QuantityCounter value={item.qty} />
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
        <div className={styles.orderLayout}>
          <div className={styles.orderContacts}>
            <a href={SITE.contacts.phoneHref} className={styles.contactCard}>
              <span className={styles.contactLabel}>Наш телефон</span>
              <span className={styles.contactValue}>{SITE.contacts.phone}</span>
            </a>
            <a href={SITE.contacts.emailHref} className={styles.contactCard}>
              <span className={styles.contactLabel}>Наша почта</span>
              <span className={styles.contactValue}>{SITE.contacts.email}</span>
            </a>
            <div className={styles.socials}>
              <a href={SITE.socials.vk.url} className={styles.socialCard}>{SITE.socials.vk.label}</a>
              <a href={SITE.socials.telegram.url} className={styles.socialCard}>{SITE.socials.telegram.label}</a>
              <a href={SITE.socials.whatsapp.url} className={styles.socialCard}>{SITE.socials.whatsapp.label}</a>
            </div>
          </div>
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
          <label className={cn(styles.field, styles.fieldTextarea)}>
            <textarea placeholder=" " rows={3} className={styles.input} />
            <span className={styles.label}>Комментарий к заказу (необязательно)</span>
          </label>
          <button type="submit" className={cn('btn', 'btn-outline', styles.submit)}>Оформить заказ</button>
        </form>
        </div>
      </div>

    </div>
  )
}
