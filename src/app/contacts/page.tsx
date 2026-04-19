import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import styles from './page.module.sass'

export default function ContactsPage() {
  return (
    <div className={styles.page}>

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
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Соцсети</span>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink}>ВКонтакте</a>
              <a href="#" className={styles.socialLink}>Telegram</a>
              <a href="#" className={styles.socialLink}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <ContactForm showTitle={false} />
      </section>

    </div>
  )
}
