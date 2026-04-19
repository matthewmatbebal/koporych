import styles from './ContactForm.module.sass'

export function ContactForm({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <>
      {showTitle && <h2>Напишите нам</h2>}
      <form className={styles.form}>
        <input type="email" placeholder="E-mail" />
        <input type="text" placeholder="Имя" />
        <input type="tel" placeholder="Ваш телефон" />
        <textarea placeholder="Ваш вопрос" rows={4} />
        <button type="submit" className="btn">Отправить</button>
      </form>
    </>
  )
}
