import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/mock/site'
import { getHomePage } from '@/lib/payload/globals'
import { isMobileRequest } from '@/lib/device'
import { FeaturedSection } from './FeaturedSection'
import styles from './HomePage.module.sass'

export async function HomePage() {
  const isMobile = await isMobileRequest()
  const { hero, aboutPreview, partners, featured } = await getHomePage(isMobile)

  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <Image src={hero.image} alt="Копорыч" fill className={styles.heroBg} priority />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <Image src={SITE.logo} alt="Копорыч" width={148} height={148} className={styles.heroLogo} />
            <p className={styles.heroTitle}>{hero.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}</p>
          </div>
          <Link href={hero.buttonHref} className={styles.heroBtn}>{hero.buttonText}</Link>
        </div>
      </section>

      <FeaturedSection isMobile={isMobile} featuredTitle={featured.title} catalogLink={featured.catalogLink} />

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

      {partners.enabled && (
        <div className={styles.sectionMuted}>
          <p>С нами сотрудничают — логотипы партнёров</p>
        </div>
      )}

    </div>
  )
}
