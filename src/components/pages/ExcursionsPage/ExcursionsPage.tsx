import Image from 'next/image'
import type { ExcursionsData } from '@/lib/payload/globals'
import styles from './ExcursionsPage.module.sass'

export function ExcursionsPage({ data }: { data: ExcursionsData }) {
  return (
    <div className={styles.page}>

      {data.hero.image && (
        <div className={styles.hero}>
          <Image src={data.hero.image} alt="Экскурсии" fill style={{ objectFit: 'cover' }} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            {data.hero.title && <h1 className={styles.heroTitle}>{data.hero.title}</h1>}
            {data.hero.subtitle && <p className={styles.heroSub}>{data.hero.subtitle}</p>}
          </div>
        </div>
      )}

      {data.events.length > 0 && (
        <div className={styles.events}>
          {data.events.map((event, i) => (
            <div key={i} className={styles.event}>
              <div className={styles.eventPhoto}>
                <Image
                  src={event.photo}
                  alt={event.caption || `Событие ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.eventText}>
                {event.caption && <h3 className={styles.eventCaption}>{event.caption}</h3>}
                {event.description && <p className={styles.eventDescription}>{event.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
