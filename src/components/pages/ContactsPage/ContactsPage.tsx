import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { getContactsPage, getSiteData } from '@/lib/payload/globals'
import { isMobileRequest } from '@/lib/device'
import styles from './ContactsPage.module.sass'

export async function ContactsPage() {
  const isMobile = await isMobileRequest()
  const [{ title }, siteData] = await Promise.all([getContactsPage(isMobile), getSiteData()])

  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <ContactForm title={title} contacts="full" contactData={siteData} />
      </section>

    </div>
  )
}
