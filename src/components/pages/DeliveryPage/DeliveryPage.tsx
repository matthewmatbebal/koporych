import Image from 'next/image'
import styles from './DeliveryPage.module.sass'

export function DeliveryPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <Image src="/images/delivery.jpg" alt="Доставка" fill style={{ objectFit: 'cover' }} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Доставка и оплата</h1>
          <p className={styles.heroSub}>Доставляем по всей России — быстро, бережно и надёжно</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Способы доставки</span>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.listName}>Почта России</span>
              <span className={styles.listMeta}>5–14 рабочих дней · от 300 ₽</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>СДЭК</span>
              <span className={styles.listMeta}>2–7 рабочих дней · от 250 ₽</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>Яндекс.Доставка</span>
              <span className={styles.listMeta}>Москва и Санкт-Петербург · от 350 ₽</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>Самовывоз</span>
              <span className={styles.listMeta}>Санкт-Петербург, ул. Примерная, 1 · бесплатно</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <span className={styles.cardLabel}>Способы оплаты</span>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.listName}>Банковская карта</span>
              <span className={styles.listMeta}>Visa, Mastercard, МИР</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>Перевод на счёт</span>
              <span className={styles.listMeta}>По реквизитам компании</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>Наличные</span>
              <span className={styles.listMeta}>При самовывозе</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <span className={styles.cardLabel}>Реквизиты</span>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.listName}>ИП Иванов Иван Иванович</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>ИНН</span>
              <span className={styles.listMeta}>784712345678</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>ОГРНИП</span>
              <span className={styles.listMeta}>321784700012345</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>Расчётный счёт</span>
              <span className={styles.listMeta}>40802810000000000001</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>Банк</span>
              <span className={styles.listMeta}>ПАО Сбербанк, г. Санкт-Петербург</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
