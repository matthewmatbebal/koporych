import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

export default function CatalogPage() {
  return (
    <div className={styles.page}>
      <WireBlock label="Заголовок: Каталог" height={64} />
      <div className={styles.categories}>
        <WireBlock label="Рассыпной" height={36} />
        <WireBlock label="Пирамидки" height={36} />
        <WireBlock label="Развес" height={36} />
      </div>
      <div className={styles.grid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Link key={i} href={`/catalog/product-${i + 1}`} className={styles.card}>
            <WireBlock
              label={`Карточка товара ${i + 1}: фото · название · цена · кнопка Купить`}
              height={300}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
