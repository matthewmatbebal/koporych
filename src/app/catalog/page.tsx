import Link from 'next/link'
import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './page.module.sass'

const PRODUCTS = [
  { slug: 'ivan-chai-classic', name: 'Иван-чай классический', weight: '100 г', price: '450 ₽' },
  { slug: 'ivan-chai-thyme', name: 'Иван-чай с чабрецом', weight: '80 г', price: '380 ₽' },
  { slug: 'ivan-chai-pyramids', name: 'Иван-чай в пирамидках', weight: '20 шт', price: '420 ₽' },
  { slug: 'ivan-chai-mint', name: 'Иван-чай с мятой', weight: '80 г', price: '360 ₽' },
  { slug: 'ivan-chai-raspberry', name: 'Иван-чай с малиной', weight: '80 г', price: '390 ₽' },
  { slug: 'ivan-chai-lemon', name: 'Иван-чай с лимоном', weight: '80 г', price: '370 ₽' },
  { slug: 'ivan-chai-bulk-200', name: 'Иван-чай рассыпной', weight: '200 г', price: '790 ₽' },
  { slug: 'ivan-chai-bulk-500', name: 'Иван-чай рассыпной', weight: '500 г', price: '1 800 ₽' },
  { slug: 'ivan-chai-gift', name: 'Подарочный набор', weight: '3 × 50 г', price: '890 ₽' },
]

export default function CatalogPage() {
  return (
    <div className={styles.page}>
      <h1>Каталог</h1>
      <div className={styles.categories}>
        <button className={styles.categoryBtn}>Все</button>
        <button className={styles.categoryBtn}>Рассыпной</button>
        <button className={styles.categoryBtn}>Пирамидки</button>
        <button className={styles.categoryBtn}>Развес</button>
      </div>
      <div className={styles.grid}>
        {PRODUCTS.map(p => (
          <Link key={p.slug} href={`/catalog/${p.slug}`} className={styles.card}>
            <WireBlock label="Фото" height={200} />
            <div className={styles.cardBody}>
              <h3 className={styles.cardName}>{p.name}</h3>
              <p className={styles.cardWeight}>{p.weight}</p>
              <div className={styles.cardFooter}>
                <span className={styles.price}>{p.price}</span>
                <button className="btn">В корзину</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
