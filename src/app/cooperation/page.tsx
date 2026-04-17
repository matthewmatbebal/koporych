import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function CooperationPage() {
  return (
    <div className={styles.page}>
      <WireBlock label="Заголовок: Сотрудничество" height={64} />
      <div className={styles.wrapper}>
        <WireBlock className={styles.photo} label="Фото" height={280} />
        <WireBlock label="Текст с вариантами сотрудничества" height={280} />
      </div>
      <ContactForm />
    </div>
  )
}
