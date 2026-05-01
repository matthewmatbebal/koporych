import cn from 'classnames'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ImageSlider } from '@/components/ui/ImageSlider/ImageSlider'
import { ABOUT_PAGE } from '@/lib/mock/about'
import styles from './AboutPage.module.sass'

export function AboutPage() {
  const { company, mission, video } = ABOUT_PAGE

  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div className={styles.photoCol}>
            <div className={styles.factoryPhoto}>
              <ImageSlider images={company.photos} alt="Производство" />
            </div>
          </div>
          <div className={styles.companyText}>
            <h2>{company.title}</h2>
            {company.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.missionInner}>
          <span className={styles.missionQuote}>«</span>
          <p className={styles.missionText}>{mission.quote}</p>
          <span className={styles.missionSource}>{mission.source}</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.twoColReversed}>
          <div className={styles.videoText}>
            <h2>{video.title}</h2>
            <p>{video.text}</p>
          </div>
          <div className={styles.videoWrapper}>
            <video src={video.src} controls playsInline preload="metadata" />
          </div>
        </div>
      </section>

      <section className={cn(styles.section, styles.sectionNext)}>
        <ContactForm title="Напишите нам" contacts={"full"} />
      </section>

    </div>
  )
}
