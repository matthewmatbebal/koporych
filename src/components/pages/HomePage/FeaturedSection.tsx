import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { PRODUCTS } from '@/lib/products'
import styles from './HomePage.module.sass'

const FEATURED = PRODUCTS.filter(p => p.featured)

export function FeaturedSection() {
  return (
    <section className={styles.section}>
      <ProductCatalog
        products={FEATURED}
        title="Избранные товары"
        catalogLink="/catalog"
        categoryImages={{
          'Рассыпной': '/images/grass.jpg',
          'Пирамидки': '/images/pyramids.jpg',
        }}
      />
    </section>
  )
}
