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
      <WireBlock label="Заголовок: Похожие товары" height={40} />
      <div className={styles.related}>
        <WireBlock label="Похожий товар 1: фото · название · цена" height={240} />
        <WireBlock label="Похожий товар 2: фото · название · цена" height={240} />
        <WireBlock label="Похожий товар 3: фото · название · цена" height={240} />
      </div>
    </div>
  )
}
