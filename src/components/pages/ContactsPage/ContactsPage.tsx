import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { CONTACTS_PAGE } from '@/lib/mock/contacts'
import styles from './ContactsPage.module.sass'

export function ContactsPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <ContactForm title={CONTACTS_PAGE.title} contacts="full" />
      </section>

    </div>
  )
}
