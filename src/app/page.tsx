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
        <WireBlock label="Заголовок: Избранные товары" height={48} />
        <div className={styles.categories}>
          <WireBlock label="Все" height={36} />
          <WireBlock label="Рассыпной" height={36} />
          <WireBlock label="Пирамидки" height={36} />
          <WireBlock label="Развес" height={36} />
        </div>
        <div className={styles.grid3}>
          {[1, 2, 3].map(i => (
            <Link key={i} href={`/catalog/product-${i}`} className={styles.card}>
              <WireBlock label={`Карточка ${i}: фото · название · микроописание · цена · кнопка Купить`} height={320} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.sectionMuted}>
        <WireBlock label="[СКРЫТО] С нами сотрудничают — логотипы партнёров (заготовка, не видна посетителям)" height={120} />
      </section>

      <section className={styles.contacts}>
        <WireBlock label="Телефон · E-mail (без формы обратной связи)" height={200} />
        <WireBlock label="Телефон · E-mail (без формы обратной связи)" height={200} />
      </section>

    </div>
  )
}
