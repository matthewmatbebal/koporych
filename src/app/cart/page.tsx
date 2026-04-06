import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function CartPage() {
  return (
    <div className={styles.page}>

      <WireBlock label="Заголовок: Корзина" height={64} />

      <div className={styles.items}>
        <WireBlock label="Позиция 1: миниатюра · название · счётчик − 1 + · цена · кнопка удалить" height={72} />
        <WireBlock label="Позиция 2: миниатюра · название · счётчик − 1 + · цена · кнопка удалить" height={72} />
      </div>

      <div className={styles.total}>
      <WireBlock label="Итого (без учёта доставки): 000 ₽" height={56} />
      </div>
      <WireBlock label="Заголовок: Оформление заказа" height={48} />
      <div className={styles.form}>
        <WireBlock label="Поле: ФИО или Компания" height={44} />
        <WireBlock label="Поле: Телефон" height={44} />
        <WireBlock label="Поле: E-mail" height={44} />
        <WireBlock label="Поле: Способ доставки (выпадающий список + поле адреса)" height={80} />
        <WireBlock label="Поле: Способ оплаты (выпадающий список)" height={44} />
        <WireBlock label="Поле: Комментарий к заказу (необязательно, textarea)" height={80} />
        <WireBlock label="Кнопка: Оформить заказ → письмо компании + письмо покупателю" height={52} />
      </div>

      <WireBlock label="[СОСТОЯНИЕ: корзина пуста] Текст: Корзина пуста · кнопка: Перейти в каталог" height={160} />

    </div>
  )
}
