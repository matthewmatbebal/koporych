import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/mock/site'
import { HOME_PAGE } from '@/lib/mock/home'
import { FeaturedSection } from './FeaturedSection'
import styles from './HomePage.module.sass'

export function HomePage() {
  const { hero, aboutPreview } = HOME_PAGE

  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <Image src={hero.image} alt="Копорыч" fill className={styles.heroBg} priority />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <Image src={SITE.logo} alt="Копорыч" width={148} height={148} className={styles.heroLogo} />
            <p className={styles.heroSub}>{hero.subtitle.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}</p>
          </div>
          <Link href={hero.buttonHref} className={styles.heroBtn}>{hero.buttonText}</Link>
        </div>
      </section>

      <FeaturedSection />

      <section className={styles.aboutSection}>
        <div className={styles.aboutPhoto}>
          <Image src={aboutPreview.image} alt={aboutPreview.eyebrow} fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.aboutInner}>
          <p className={styles.aboutEyebrow}>{aboutPreview.eyebrow}</p>
          <h2>{aboutPreview.title.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}</h2>
          <p>{aboutPreview.text}</p>
          <Link href={aboutPreview.buttonHref} className="btn btn-outline">{aboutPreview.buttonText}</Link>
        </div>
      </section>

      <div className={styles.sectionMuted}>
        <p>С нами сотрудничают — логотипы партнёров</p>
      </div>

    </div>
  )
}
