import cn from 'classnames'
import Image from 'next/image'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
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
              <Image src={company.photos[0]} alt="Производство" fill className={styles.factoryImg} />
            </div>
          </div>
          <div className={styles.videoText}>
            <h2>{company.title}</h2>
            <p>{company.intro}</p>
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
