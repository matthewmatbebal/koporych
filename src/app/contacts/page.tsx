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
        <div className={styles.form}>
          <WireBlock label="Поле: E-mail" height={44} />
          <WireBlock label="Поле: Имя" height={44} />
          <WireBlock label="Поле: Ваш Телефон" height={44} />
          <WireBlock label="Поле: Вопрос (textarea)" height={96} />
          <WireBlock label="Кнопка: Отправить" height={44} />
        </div>
      </section>

    </div>
  )
}
