import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import styles from './ContactsPage.module.sass'

export function ContactsPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <ContactForm title="Мы всегда на связи" contacts="full" />
      </section>

    </div>
  )
}
