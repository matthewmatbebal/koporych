import Link from 'next/link'
import Image from 'next/image'
import { FeaturedSection } from './FeaturedSection'
import styles from './page.module.sass'

export function HomePage() {
  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <Image src="/images/banner.jpg" alt="Копорыч" fill className={styles.heroBg} priority />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Копорыч</h1>
          <p className={styles.heroSub}>Традиционный русский чай<br />из экологически чистых мест</p>
          <Link href="/catalog" className={styles.heroBtn}>Смотреть каталог</Link>
        </div>
      </section>

      <FeaturedSection />

      <section className={styles.aboutSection}>
        <div className={styles.aboutPhoto}>
          <Image src="/images/about.jpg" alt="О нас" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.aboutInner}>
          <p className={styles.aboutEyebrow}>О нас</p>
          <h2>Мы делаем чай<br />с душой</h2>
          <p>Собираем иван-чай вручную в экологически чистых местах Ленинградской и Вологодской областей. Традиционная ферментация — насыщенный вкус и аромат, без кофеина.</p>
          <Link href="/about" className="btn btn-outline">Узнать больше</Link>
        </div>
      </section>

      <div className={styles.sectionMuted}>
        <p>С нами сотрудничают — логотипы партнёров</p>
      </div>

    </div>
  )
}
