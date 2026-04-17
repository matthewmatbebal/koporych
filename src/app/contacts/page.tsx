import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function ContactsPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <WireBlock label="Заголовок: Мы всегда на связи" height={48} />
        <div className={styles.contacts}>
          <WireBlock label="Телефон" height={80} />
          <WireBlock label="Email" height={80} />
        </div>
        <WireBlock label="Соцсети" height={80} />
      </section>

      <section className={styles.section}>
        <ContactForm showTitle={false} />
      </section>

    </div>
  )
}
