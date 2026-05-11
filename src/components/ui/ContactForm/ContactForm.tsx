import cn from 'classnames'
import { SITE } from '@/lib/mock/site'
import type { SiteData } from '@/lib/payload/globals'
import styles from './ContactForm.module.sass'

type ContactsVariant = 'default' | 'full' | 'none'

export function ContactForm({ title, subtitle, contacts = 'default', contactData }: { title?: string; subtitle?: string; contacts?: ContactsVariant; contactData?: SiteData }) {
  const showLeft = contacts !== 'none'
  const phone = contactData?.contacts.phone ?? SITE.contacts.phone
  const phoneHref = contactData?.contacts.phoneHref ?? SITE.contacts.phoneHref
  const email = contactData?.contacts.email ?? SITE.contacts.email
  const emailHref = contactData?.contacts.emailHref ?? SITE.contacts.emailHref
  const socials = contactData?.socials ?? SITE.socials

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        {title && <h2>{title}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={cn(styles.layout, { [styles.layoutWithContacts]: showLeft })}>
        {showLeft && (
          <div className={styles.left}>
            <a href={phoneHref} className={styles.card}>
              <span className={styles.cardLabel}>Наш телефон</span>
              <span className={styles.cardValue}>{phone}</span>
            </a>
            <a href={emailHref} className={styles.card}>
              <span className={styles.cardLabel}>Наша почта</span>
              <span className={styles.cardValue}>{email}</span>
            </a>
            {contacts === 'full' && (
              <div className={styles.socials}>
                <a href={socials.vk.url} className={styles.socialCard}>{socials.vk.label}</a>
                <a href={socials.telegram.url} className={styles.socialCard}>{socials.telegram.label}</a>
                <a href={socials.whatsapp.url} className={styles.socialCard}>{socials.whatsapp.label}</a>
              </div>
            )}
          </div>
        )}
        <div className={styles.formWrapper}>
          <div className={styles.titleMobile}>
            {title && <h2>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
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
    </div>
  )
}
