import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function AboutPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <div className={styles.twoCol}>
          <WireBlock label="Карусель фото производства (этапы) с подписями" height={360} />
          <WireBlock label="Текст-представление компании" height={360} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.missionSection}`}>
        <div className={styles.missionInner}>
          <WireBlock label="Заголовок: Миссия" height={48} />
          <WireBlock label="Текст миссии" height={200} />
        </div>
      </section>

      <section className={styles.section}>
        <WireBlock label="Заголовок: Мы всегда на связи" height={48} />
        <div className={styles.contacts}>
          <WireBlock label="Телефон" height={80} />
          <WireBlock label="Email" height={80} />
        </div>
        <WireBlock label="Соцсети" height={80} />
      </section>

      <section className={styles.section}>
        <WireBlock label="Заголовок: Напишите нам" height={48} />
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
