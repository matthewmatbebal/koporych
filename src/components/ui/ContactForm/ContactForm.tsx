import cn from 'classnames'
import styles from './ContactForm.module.sass'

export function ContactForm({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <>
      {showTitle && <h2>Напишите нам</h2>}
      <form className={styles.form}>
        <label className={styles.field}>
          <input type="email" placeholder=" " className={styles.input} />
          <span className={styles.label}>E-mail</span>
        </label>
        <label className={styles.field}>
          <input type="text" placeholder=" " className={styles.input} />
          <span className={styles.label}>Имя</span>
        </label>
        <label className={styles.field}>
          <input type="tel" placeholder=" " className={styles.input} />
          <span className={styles.label}>Телефон</span>
        </label>
        <label className={cn(styles.field, styles.fieldTextarea)}>
          <textarea placeholder=" " rows={4} className={styles.input} />
          <span className={styles.label}>Ваш вопрос</span>
        </label>
        <button type="submit" className={cn('btn', styles.submit)}>Отправить</button>
      </form>
    </>
  )
}
