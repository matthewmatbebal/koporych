import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function CooperationPage() {
  return (
    <div className={styles.page}>
      <WireBlock label="Заголовок: Сотрудничество" height={64} />
      <WireBlock label="Фото + текст с вариантами сотрудничества" height={280} />
      <WireBlock label="Заголовок: Напишите нам" height={48} />
      <div className={styles.form}>
        <WireBlock label="Поле: Имя" height={44} />
        <WireBlock label="Поле: Телефон" height={44} />
        <WireBlock label="Поле: E-mail" height={44} />
        <WireBlock label="Поле: Сообщение (textarea)" height={96} />
        <WireBlock label="Кнопка: Отправить → письмо на почту компании" height={44} />
      </div>
    </div>
  )
}
