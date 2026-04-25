import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ContactInfo } from '@/components/ui/ContactInfo/ContactInfo'
import styles from './page.module.sass'

export default function ContactsPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <h2>Мы всегда на связи</h2>
        <ContactInfo />
      </section>

      <section className={styles.section}>
        <ContactForm />
      </section>

    </div>
  )
}
