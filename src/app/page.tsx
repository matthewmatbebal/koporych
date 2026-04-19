import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import { FeaturedSection } from './FeaturedSection'
import styles from './page.module.sass'

export default function HomePage() {
  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <WireBlock label="Фото" height={640} className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>
            <span>Иван-чай</span>
            <span className={styles.eyebrowDivider}>—</span>
            <span>Ручной сбор</span>
            <span className={styles.eyebrowDivider}>—</span>
            <span>Россия</span>
          </p>
          <h1 className={styles.heroTitle}>Копорыч</h1>
          <p className={styles.heroSub}>Традиционный русский чай<br />из экологически чистых мест</p>
          <Link href="/catalog" className={styles.heroBtn}>Смотреть каталог</Link>
        </div>
      </section>

      <FeaturedSection />

      <section className={styles.aboutSection}>
        <WireBlock label="Фото" height={480} className={styles.aboutPhoto} />
        <div className={styles.aboutInner}>
          <p className={styles.aboutEyebrow}>О нас</p>
          <h2>Мы делаем чай<br />с душой</h2>
          <p>Собираем иван-чай вручную в экологически чистых местах Ленинградской и Вологодской областей. Традиционная ферментация — насыщенный вкус и аромат, без кофеина.</p>
          <Link href="/about" className="btn">Узнать больше</Link>
        </div>
      </section>

      <div className={styles.sectionMuted}>
        <p>С нами сотрудничают — логотипы партнёров</p>
      </div>

    </div>
  )
}
