import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { getContactsPage } from '@/lib/payload/globals'
import styles from './ContactsPage.module.sass'

export async function ContactsPage() {
  const { title } = await getContactsPage()

  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <ContactForm title={title} contacts="full" />
      </section>

    </div>
  )
}
