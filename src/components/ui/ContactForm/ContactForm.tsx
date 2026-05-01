import cn from 'classnames'
import styles from './ContactForm.module.sass'

type ContactsVariant = 'default' | 'full' | 'none'

export function ContactForm({ title, subtitle, contacts = 'default' }: { title?: string; subtitle?: string; contacts?: ContactsVariant }) {
  const showLeft = contacts !== 'none'

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        {title && <h2>{title}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={cn(styles.layout, { [styles.layoutWithContacts]: showLeft })}>
        {showLeft && (
          <div className={styles.left}>
            <a href="tel:+79001234567" className={styles.card}>
              <span className={styles.cardLabel}>Наш телефон</span>
              <span className={styles.cardValue}>+7 (900) 123-45-67</span>
            </a>
            <a href="mailto:hello@koporych.ru" className={styles.card}>
              <span className={styles.cardLabel}>Наша почта</span>
              <span className={styles.cardValue}>hello@koporych.ru</span>
            </a>
            {contacts === 'full' && (
              <div className={styles.socials}>
                <a href="#" className={styles.socialCard}>ВКонтакте</a>
                <a href="#" className={styles.socialCard}>Telegram</a>
                <a href="#" className={styles.socialCard}>WhatsApp</a>
              </div>
            )}
          </div>
        )}
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
          <button type="submit" className={cn('btn-outline', 'btn', styles.submit)}>Отправить</button>
        </form>
      </div>
    </div>
  )
}
