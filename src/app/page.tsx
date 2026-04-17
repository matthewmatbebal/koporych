import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function HomePage() {
  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <WireBlock label="HERO: большое фото · название КОПОРЫЧ · короткий текст · кнопка Каталог" height={480} />
      </section>

      <section className={styles.section}>
        <div className={styles.categories}>
          <WireBlock label="Рассыпной" height={42} />
          <WireBlock label="Пирамидки" height={42} />
          <WireBlock label="Развес" height={42} />
        </div>
        <WireBlock label="Заголовок: Избранные товары" height={48} />
        <div className={styles.grid3}>
          {[1, 2, 3].map(i => (
            <Link key={i} href={`/catalog/product-${i}`} className={styles.card}>
              <WireBlock label={`Карточка ${i}: фото · название · микроописание · цена · кнопка Купить`} height={320} />
            </Link>
          ))}
        </div>
      </section>



      <section className={styles.contacts}>
          <WireBlock className={styles.photo} label="Фото" height={240} />
        <div className={styles.contactsInner}>
          <WireBlock label="Описание" height={180} />
          <WireBlock label="О нас" height={44} className={styles.button} />
        </div>
      </section>

      <section className={styles.sectionMuted}>
        <WireBlock label="[СКРЫТО] С нами сотрудничают — логотипы партнёров (заготовка, не видна посетителям)" height={120} />
      </section>
    </div>
  )
}
