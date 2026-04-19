import cn from 'classnames'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function AboutPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <div className={styles.twoCol}>
          <WireBlock label="Фото производства" height={360} />
          <div className={styles.companyText}>
            <h2>О компании</h2>
            <p>Копорыч — небольшая семейная мастерская в Ленинградской области. Мы возрождаем традицию русского иван-чая: собираем листья кипрея вручную в экологически чистых местах, ферментируем и сушим по старинным рецептам.</p>
            <p>Наш чай не содержит кофеина, богат витаминами и подходит для ежедневного употребления всей семьёй. Каждая партия — это ручной труд и забота о качестве.</p>
          </div>
        </div>
      </section>

      <section className={cn(styles.section, styles.missionSection)}>
        <div className={styles.missionInner}>
          <h2>Миссия</h2>
          <p>Мы хотим вернуть иван-чай на столы российских семей. Натуральный, без химии, собранный с любовью — такой чай когда-то пили наши предки, и мы уверены: он должен быть в каждом доме.</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Мы всегда на связи</h2>
        <div className={styles.contacts}>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Телефон</span>
            <a href="tel:+79001234567" className={styles.contactValue}>+7 (900) 123-45-67</a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Email</span>
            <a href="mailto:hello@koporych.ru" className={styles.contactValue}>hello@koporych.ru</a>
          </div>
        </div>
        <div className={styles.socials}>
          <a href="#" className={styles.socialLink}>ВКонтакте</a>
          <a href="#" className={styles.socialLink}>Telegram</a>
          <a href="#" className={styles.socialLink}>WhatsApp</a>
        </div>
      </section>

      <section className={styles.section}>
        <ContactForm />
      </section>

    </div>
  )
}
