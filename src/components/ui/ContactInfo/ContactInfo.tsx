import styles from './ContactInfo.module.sass'

export function ContactInfo() {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <a href="tel:+79001234567" className={styles.card}>
          <span className={styles.label}>Телефон</span>
          <span className={styles.value}>+7 (900) 123-45-67</span>
        </a>
        <a href="mailto:hello@koporych.ru" className={styles.card}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>hello@koporych.ru</span>
        </a>
      </div>
      <div className={styles.socials}>
        <a href="#" className={styles.card}>
          <span className={styles.value}>ВКонтакте</span>
        </a>
        <a href="#" className={styles.card}>
          <span className={styles.value}>Telegram</span>
        </a>
        <a href="#" className={styles.card}>
          <span className={styles.value}>WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
