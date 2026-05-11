'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CustomSelect } from '@/components/ui/CustomSelect/CustomSelect'
import { QuantityCounter } from '@/components/ui/QuantityCounter/QuantityCounter'
import type { SiteData } from '@/lib/payload/globals'
import { useCartStore } from '@/store/cartStore'
import styles from './CartPage.module.sass'

const DELIVERY_OPTIONS = ['Почта России', 'СДЭК', 'Яндекс.Доставка', 'Самовывоз']
const PAYMENT_OPTIONS = ['Банковская карта', 'Перевод на счёт', 'Наличные при самовывозе']

export function CartPage({ contactData }: { contactData: SiteData }) {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, totalPrice, setLastOrder } = useCartStore()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Укажите ФИО или название компании'
    if (!phone.trim() || !/^[\d\s\-\+\(\)]{7,}$/.test(phone)) e.phone = 'Укажите корректный телефон'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Укажите корректный e-mail'
    if (!deliveryMethod) e.delivery = 'Выберите способ доставки'
    if (deliveryMethod !== 'Самовывоз' && !address.trim()) e.address = 'Укажите адрес доставки'
    if (!paymentMethod) e.payment = 'Выберите способ оплаты'
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
      const body = {
        customer: { name, phone, email },
        delivery: { method: deliveryMethod, address: deliveryMethod !== 'Самовывоз' ? address : undefined },
        payment: { method: paymentMethod },
        comment: comment || undefined,
        items,
        total: totalPrice(),
      }
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('server error')
      const { orderNumber } = await res.json()
      setLastOrder({
        orderNumber,
        customer: { name, phone, email },
        items,
        total: totalPrice(),
        delivery: body.delivery,
        payment: { method: paymentMethod },
        comment: comment || undefined,
      })
      clearCart()
      router.push('/cart/success')
    } catch {
      setSubmitError('Что-то пошло не так. Попробуйте ещё раз или напишите нам на почту.')
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <h1>Корзина</h1>
        <div className={styles.emptyState}>
          <p>В корзине пока ничего нет</p>
          <Link href="/catalog" className="btn btn-outline">Перейти в каталог</Link>
        </div>
      </div>
    )
  }

  const total = totalPrice()

  return (
    <div className={styles.page}>

      <h1>Корзина</h1>

      <div className={styles.cartSection}>
        <div className={styles.items}>
          {items.map(item => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemPhoto}>
                {item.image && (
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                )}
              </div>
              <div className={styles.itemRight}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemWeight}>{item.weight}</span>
                </div>
                <div className={styles.itemBottom}>
                  <QuantityCounter
                    value={item.quantity}
                    onChange={v => {
                      if (v === 0) removeItem(item.id)
                      else updateQuantity(item.id, v)
                    }}
                  />
                  <span className={styles.itemPrice}>
                    {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </span>
                  <button type="button" className={styles.removeBtn} onClick={() => removeItem(item.id)}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.total}>
          <span>Итого (без учёта доставки)</span>
          <strong>{total.toLocaleString('ru-RU')} ₽</strong>
        </div>
      </div>

      <div className={styles.orderSection}>
        <h2 className={styles.orderTitle}>Оформление заказа</h2>
        <div className={styles.orderLayout}>
          <div className={styles.orderContacts}>
            <a href={contactData.contacts.phoneHref} className={styles.contactCard}>
              <span className={styles.contactLabel}>Наш телефон</span>
              <span className={styles.contactValue}>{contactData.contacts.phone}</span>
            </a>
            <a href={contactData.contacts.emailHref} className={styles.contactCard}>
              <span className={styles.contactLabel}>Наша почта</span>
              <span className={styles.contactValue}>{contactData.contacts.email}</span>
            </a>
            <div className={styles.socials}>
              <a href={contactData.socials.vk.url} className={styles.socialCard}>{contactData.socials.vk.label}</a>
              <a href={contactData.socials.telegram.url} className={styles.socialCard}>{contactData.socials.telegram.label}</a>
              <a href={contactData.socials.whatsapp.url} className={styles.socialCard}>{contactData.socials.whatsapp.label}</a>
            </div>
          </div>

          <div className={styles.formWrapper}>
            <h2 className={styles.orderTitleMobile}>Оформление заказа</h2>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label className={styles.field}>
                <input
                  type="email"
                  placeholder=" "
                  className={cn(styles.input, { [styles.inputError]: errors.email })}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                <span className={styles.label}>ФИО или Компания</span>
                {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
              </label>
              <label className={styles.field}>
                <input
                  type="tel"
                  placeholder=" "
                  className={cn(styles.input, { [styles.inputError]: errors.phone })}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
                <span className={styles.label}>Телефон</span>
                {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
              </label>
              <div>
                <CustomSelect
                  label="Способ доставки"
                  options={DELIVERY_OPTIONS}
                  name="delivery"
                  onChange={setDeliveryMethod}
                />
                {errors.delivery && <span className={styles.fieldError}>{errors.delivery}</span>}
              </div>
              {deliveryMethod && deliveryMethod !== 'Самовывоз' && (
                <label className={styles.field}>
                  <input
                    type="text"
                    placeholder=" "
                    className={cn(styles.input, { [styles.inputError]: errors.address })}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                  <span className={styles.label}>Адрес доставки</span>
                  {errors.address && <span className={styles.fieldError}>{errors.address}</span>}
                </label>
              )}
              <div>
                <CustomSelect
                  label="Способ оплаты"
                  options={PAYMENT_OPTIONS}
                  name="payment"
                  onChange={setPaymentMethod}
                />
                {errors.payment && <span className={styles.fieldError}>{errors.payment}</span>}
              </div>
              <label className={cn(styles.field, styles.fieldTextarea)}>
                <textarea
                  placeholder=" "
                  rows={3}
                  className={styles.input}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <span className={styles.label}>Комментарий к заказу (необязательно)</span>
              </label>
              {submitError && <p className={styles.submitError}>{submitError}</p>}
              <button
                type="submit"
                className={cn('btn', 'btn-outline', styles.submit)}
                disabled={submitting}
              >
                {submitting ? 'Отправляем...' : 'Оформить заказ'}
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
