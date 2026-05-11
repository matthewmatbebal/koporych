import Image from 'next/image'
import { getDeliveryPage } from '@/lib/payload/globals'
import { isMobileRequest } from '@/lib/device'
import styles from './DeliveryPage.module.sass'

export async function DeliveryPage() {
  const isMobile = await isMobileRequest()
  const { hero, deliveryMethods, paymentMethods, requisites } = await getDeliveryPage(isMobile)

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <Image src={hero.image} alt="Доставка" fill style={{ objectFit: 'cover' }} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroSub}>{hero.subtitle}</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Способы доставки</span>
          <ul className={styles.list}>
            {deliveryMethods.map((m, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.listName}>{m.name}</span>
                <span className={styles.listMeta}>{m.meta}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          <span className={styles.cardLabel}>Способы оплаты</span>
          <ul className={styles.list}>
            {paymentMethods.map((m, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.listName}>{m.name}</span>
                <span className={styles.listMeta}>{m.meta}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          <span className={styles.cardLabel}>Реквизиты</span>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.listName}>{requisites.companyName}</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>ИНН</span>
              <span className={styles.listMeta}>{requisites.inn}</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>ОГРНИП</span>
              <span className={styles.listMeta}>{requisites.ogrnip}</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>Расчётный счёт</span>
              <span className={styles.listMeta}>{requisites.bankAccount}</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.listName}>Банк</span>
              <span className={styles.listMeta}>{requisites.bank}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
