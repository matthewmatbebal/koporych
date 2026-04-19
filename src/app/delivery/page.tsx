import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function DeliveryPage() {
  return (
    <div className={styles.page}>
      <h1>Доставка и оплата</h1>
      <WireBlock label="Фото" height={280} />
      <div className={styles.section}>
        <h2>Способы доставки</h2>
        <ul className={styles.list}>
          <li>Почта России — от 5 до 14 рабочих дней, от 300 ₽</li>
          <li>СДЭК — от 2 до 7 рабочих дней, от 250 ₽</li>
          <li>Яндекс.Доставка — по Москве и Санкт-Петербургу, от 350 ₽</li>
          <li>Самовывоз — Санкт-Петербург, ул. Примерная, 1 — бесплатно</li>
        </ul>
      </div>
      <div className={styles.section}>
        <h2>Способы оплаты</h2>
        <ul className={styles.list}>
          <li>Банковская карта онлайн (Visa, Mastercard, МИР)</li>
          <li>Перевод на счёт компании</li>
          <li>Наличные при самовывозе</li>
        </ul>
      </div>
      <div className={styles.section}>
        <h2>Реквизиты</h2>
        <div className={styles.details}>
          <p>ИП Иванов Иван Иванович</p>
          <p>ИНН: 784712345678</p>
          <p>ОГРНИП: 321784700012345</p>
          <p>Расчётный счёт: 40802810000000000001</p>
          <p>Банк: ПАО Сбербанк, г. Санкт-Петербург</p>
        </div>
      </div>
    </div>
  )
}
