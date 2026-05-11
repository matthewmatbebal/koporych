import cn from 'classnames'
import Image from 'next/image'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { getAboutPage, getSiteData } from '@/lib/payload/globals'
import styles from './AboutPage.module.sass'

export async function AboutPage() {
  const [{ company, mission, video }, siteData] = await Promise.all([getAboutPage(), getSiteData()])

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

      <section className={cn(styles.section, styles.sectionNext)}>
        <div className={styles.stagesGrid}>
          {company.stages.map((stage, i) => (
            <div key={i} className={styles.stageItem}>
              <div className={styles.stagePhoto}>
                <Image src={stage.photo} alt={`Этап ${i + 1}`} fill className={styles.stageImg} />
              </div>
              <p className={styles.stageText}>{stage.text}</p>
            </div>
          ))}
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
        <ContactForm title="Напишите нам" contacts={"full"} contactData={siteData} />
      </section>

    </div>
  )
}
