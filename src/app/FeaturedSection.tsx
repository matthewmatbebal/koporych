import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { PRODUCTS } from '@/lib/products'
import styles from './page.module.sass'

const FEATURED = PRODUCTS.filter(p => p.featured)

export function FeaturedSection() {
  return (
    <section className={styles.section}>
      <h2>Избранные товары</h2>
      <ProductCatalog
        products={FEATURED}
        catalogLink="/catalog"
        categoryImages={{
          'Рассыпной': '/images/grass.jpg',
          'Пирамидки': '/images/pyramids.jpg',
        }}
      />
    </section>
  )
}
