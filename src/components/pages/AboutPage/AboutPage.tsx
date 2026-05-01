import cn from 'classnames'
import Image from 'next/image'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ContactInfo } from '@/components/ui/ContactInfo/ContactInfo'
import { ABOUT_PAGE } from '@/lib/mock/about'
import styles from './AboutPage.module.sass'

export function AboutPage() {
  const { company, mission } = ABOUT_PAGE

  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div className={styles.factoryPhoto}>
            <Image src={company.photo} alt="Производство" fill style={{ objectFit: 'cover' }} />
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
        <h2>Мы всегда на связи</h2>
        <ContactInfo />
      </section>

      <section className={cn(styles.section, styles.sectionNext)}>
        <ContactForm title="Напишите нам" />
      </section>

    </div>
  )
}
