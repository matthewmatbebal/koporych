'use client'

import cn from 'classnames'
import { useState } from 'react'
import { SITE } from '@/lib/mock/site'
import type { SiteData } from '@/lib/payload/globals'
import { Toast } from '@/components/ui/Toast/Toast'
import styles from './ContactForm.module.sass'

type ContactsVariant = 'default' | 'full' | 'none'

export function ContactForm({ title, subtitle, contacts = 'default', contactData }: { title?: string; subtitle?: string; contacts?: ContactsVariant; contactData?: SiteData }) {
  const showLeft = contacts !== 'none'
  const phone = contactData?.contacts.phone ?? SITE.contacts.phone
  const phoneHref = contactData?.contacts.phoneHref ?? SITE.contacts.phoneHref
  const email = contactData?.contacts.email ?? SITE.contacts.email
  const emailHref = contactData?.contacts.emailHref ?? SITE.contacts.emailHref
  const socials = contactData?.socials ?? SITE.socials

  const [name, setName] = useState('')
  const [phoneVal, setPhoneVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [message, setMessage] = useState('')
  const [agreePersonal, setAgreePersonal] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Укажите имя'
    if (!phoneVal.trim() || !/^[\d\s\-\+\(\)]{7,}$/.test(phoneVal)) e.phone = 'Укажите корректный телефон'
    if (!emailVal.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) e.email = 'Укажите корректный e-mail'
    if (!message.trim()) e.message = 'Напишите ваш вопрос'
    if (!agreePersonal) e.agreePersonal = 'Необходимо ваше согласие'
    if (!agreePrivacy) e.agreePrivacy = 'Необходимо ваше согласие'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: phoneVal, email: emailVal, message }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      if (typeof window.ym === 'function') window.ym(109184312, 'reachGoal', 'form_submit')
    } catch {
      setSubmitError('Что-то пошло не так. Попробуйте ещё раз или напишите нам напрямую.')
    } finally {
      setSubmitting(false)
    }
  }

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
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label className={styles.field}>
                <input
                  type="email"
                  placeholder=" "
                  className={cn(styles.input, { [styles.inputError]: errors.email })}
                  value={emailVal}
                  onChange={e => setEmailVal(e.target.value)}
                />
                <span className={styles.label}>E-mail</span>
                {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
              </label>
              <label className={styles.field}>
                <input
                  type="text"
                  placeholder=" "
                  className={cn(styles.input, { [styles.inputError]: errors.name })}
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <span className={styles.label}>Имя</span>
                {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
              </label>
              <label className={styles.field}>
                <input
                  type="tel"
                  placeholder=" "
                  className={cn(styles.input, { [styles.inputError]: errors.phone })}
                  value={phoneVal}
                  onChange={e => setPhoneVal(e.target.value)}
                />
                <span className={styles.label}>Телефон</span>
                {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
              </label>
              <label className={cn(styles.field, styles.fieldTextarea)}>
                <textarea
                  placeholder=" "
                  rows={4}
                  className={cn(styles.input, { [styles.inputError]: errors.message })}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
                <span className={styles.label}>Ваш вопрос</span>
                {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
              </label>
              <div className={styles.checkboxField}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={agreePersonal}
                    onChange={e => setAgreePersonal(e.target.checked)}
                  />
                  <span>Я прочитал(а) и согласен(на) с <a href="/docs/personal-data-policy.pdf" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>политикой обработки персональных данных</a></span>
                </label>
                {errors.agreePersonal && <span className={styles.fieldError}>{errors.agreePersonal}</span>}
              </div>
              <div className={styles.checkboxField}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={e => setAgreePrivacy(e.target.checked)}
                  />
                  <span>Я прочитал(а) и согласен(на) с <a href="/docs/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>политикой конфиденциальности</a></span>
                </label>
                {errors.agreePrivacy && <span className={styles.fieldError}>{errors.agreePrivacy}</span>}
              </div>
              {submitError && <p className={styles.submitError}>{submitError}</p>}
              {sent && <Toast message="Заявка отправлена! Мы свяжемся с вами в ближайшее время." onDone={() => setSent(false)} />}
              <button
                type="submit"
                className={cn('btn-outline', 'btn', styles.submit)}
                disabled={submitting}
              >
                {submitting ? 'Отправляем...' : 'Отправить'}
              </button>
            </form>
        </div>
      </div>
    </div>
  )
}
