import Image from 'next/image'
import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import styles from './page.module.sass'

export default function CooperationPage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.photo}>
          <Image src="/images/river.jpg" alt="Сотрудничество" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.text}>
          <h2>Варианты сотрудничества</h2>
          <p>Мы открыты для партнёрства с магазинами здорового питания, ресторанами, кафе и корпоративными заказчиками.</p>
          <ul className={styles.list}>
            <li><strong>Оптовые поставки</strong> — регулярные заказы от 10 кг со скидкой до 30%</li>
            <li><strong>Ресторанный формат</strong> — фасовка и оформление под ваше меню</li>
            <li><strong>Корпоративные подарки</strong> — наборы с вашим брендом для сотрудников и клиентов</li>
            <li><strong>Совместное производство</strong> — уникальные купажи под вашу марку</li>
          </ul>
          <p>Напишите нам — обсудим условия индивидуально.</p>
        </div>
      </div>
      <ContactForm title="Напишите нам" />
    </div>
  )
}
