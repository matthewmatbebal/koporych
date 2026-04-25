import cn from 'classnames'
import Image from 'next/image'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ContactInfo } from '@/components/ui/ContactInfo/ContactInfo'
import styles from './page.module.sass'

export default function AboutPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div className={styles.factoryPhoto}>
            <Image src="/images/factory.jpg" alt="Производство" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.companyText}>
            <h2>О компании</h2>
            <p>Копорыч — небольшая семейная мастерская в Ленинградской области. Мы возрождаем традицию русского иван-чая: собираем листья кипрея вручную в экологически чистых местах, ферментируем и сушим по старинным рецептам.</p>
            <p>Наш чай не содержит кофеина, богат витаминами и подходит для ежедневного употребления всей семьёй. Каждая партия — это ручной труд и забота о качестве.</p>
          </div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.missionInner}>
          <span className={styles.missionQuote}>«</span>
          <p className={styles.missionText}>Мы хотим вернуть иван-чай на столы российских семей. Натуральный, без химии, собранный с любовью — такой чай когда-то пили наши предки, и мы уверены: он должен быть в каждом доме.</p>
          <span className={styles.missionSource}>— Копорыч</span>
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
