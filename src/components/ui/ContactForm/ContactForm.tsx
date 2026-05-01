import cn from 'classnames'
import { SITE } from '@/lib/mock/site'
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
            <a href={SITE.contacts.phoneHref} className={styles.card}>
              <span className={styles.cardLabel}>Наш телефон</span>
              <span className={styles.cardValue}>{SITE.contacts.phone}</span>
            </a>
            <a href={SITE.contacts.emailHref} className={styles.card}>
              <span className={styles.cardLabel}>Наша почта</span>
              <span className={styles.cardValue}>{SITE.contacts.email}</span>
            </a>
            {contacts === 'full' && (
              <div className={styles.socials}>
                <a href={SITE.socials.vk.url} className={styles.socialCard}>{SITE.socials.vk.label}</a>
                <a href={SITE.socials.telegram.url} className={styles.socialCard}>{SITE.socials.telegram.label}</a>
                <a href={SITE.socials.whatsapp.url} className={styles.socialCard}>{SITE.socials.whatsapp.label}</a>
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
