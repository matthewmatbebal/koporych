import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './ContactForm.module.sass'

export function ContactForm({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <>
      {showTitle && <WireBlock label="Заголовок: Напишите нам" height={48} />}
      <div className={styles.form}>
        <WireBlock label="Поле: E-mail" height={44} />
        <WireBlock label="Поле: Имя" height={44} />
        <WireBlock label="Поле: Ваш Телефон" height={44} />
        <WireBlock label="Поле: Вопрос (textarea)" height={96} />
        <WireBlock label="Кнопка: Отправить" height={44} />
      </div>
    </>
  )
}
