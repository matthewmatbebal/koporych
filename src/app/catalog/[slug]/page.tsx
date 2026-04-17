import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug: _slug } = await params
  return (
    <div className={styles.page}>
      <div className={styles.product}>
        <div className={styles.gallery}>
          <WireBlock label="Карусель фото товара (основное фото)" height={400} />
          <div className={styles.thumbs}>
            <WireBlock label="Фото 1" height={72} />
            <WireBlock label="Фото 2" height={72} />
            <WireBlock label="Фото 3" height={72} />
          </div>
        </div>
        <div className={styles.info}>
          <WireBlock label="Название товара (H1)" height={56} />
          <WireBlock label="Описание товара — полный текст" height={160} />
          <WireBlock label="Вес: 100 г" height={40} />
          <WireBlock label="Цена: 000 ₽" height={48} />
          <div className={styles.addToCart}>
            <WireBlock label="Счётчик: − 1 +" height={44} />
            <WireBlock label="Кнопка: Добавить в корзину" height={44} />
          </div>
        </div>
      </div>
      <div className={styles.formTitle}>
        <WireBlock label="Не нашли что искали?" height={40} />
        <WireBlock label="Ответим на любые вопросы и поможем индивидуально подобрать чай" height={24} />
      </div>
      <div className={styles.form}>
        <WireBlock label="Поле: E-mail" height={44} />
        <WireBlock label="Поле: Имя" height={44} />
        <WireBlock label="Поле: Ваш телефон" height={44} />
        <WireBlock label="Поле: Вопрос (textarea)" height={96} />
        <WireBlock label="Кнопка: Отправить" height={44} />
      </div>
    </div>
  )
}
