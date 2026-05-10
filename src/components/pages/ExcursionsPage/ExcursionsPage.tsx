import cn from 'classnames'
import Image from 'next/image'
import type { ExcursionsData } from '@/lib/payload/globals'
import styles from './ExcursionsPage.module.sass'

export function ExcursionsPage({ data }: { data: ExcursionsData }) {
  return (
    <div className={styles.page}>

      <div className={styles.intro}>
        {data.hero.image && (
          <div className={styles.introPhoto}>
            <Image src={data.hero.image} alt="Экскурсии" fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div className={styles.introText}>
          {data.hero.title && <h1 className={styles.introTitle}>{data.hero.title}</h1>}
          {data.hero.subtitle && <p className={styles.introSub}>{data.hero.subtitle}</p>}
        </div>
      </div>

      {data.events.length > 0 && (
        <div className={styles.events}>
          {data.events.map((event, i) => {
            const reversed = i % 2 === 0
            const photo = (
              <div className={styles.eventPhoto}>
                <Image src={event.photo} alt={event.caption || `Событие ${i + 1}`} fill style={{ objectFit: 'cover' }} />
              </div>
            )
            const text = (
              <div className={styles.eventText}>
                {event.caption && <h3 className={styles.eventCaption}>{event.caption}</h3>}
                {event.description && <p className={styles.eventDescription}>{event.description}</p>}
              </div>
            )
            return (
              <div key={i} className={cn(styles.event, { [styles.eventReversed]: reversed })}>
                {reversed ? <>{text}{photo}</> : <>{photo}{text}</>}
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}
