import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { getContactsPage, getSiteData } from '@/lib/payload/globals'
import styles from './ContactsPage.module.sass'

export async function ContactsPage() {
  const [{ title }, siteData] = await Promise.all([getContactsPage(), getSiteData()])

  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <ContactForm title={title} contacts="full" contactData={siteData} />
      </section>

    </div>
  )
}
