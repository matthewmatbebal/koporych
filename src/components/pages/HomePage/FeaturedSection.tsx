import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { PRODUCTS } from '@/lib/products'
import { HOME_PAGE } from '@/lib/mock/home'
import styles from './HomePage.module.sass'

const FEATURED = PRODUCTS.filter(p => p.featured)

export function FeaturedSection() {
  return (
    <section className={styles.section}>
      <ProductCatalog
        products={FEATURED}
        title={HOME_PAGE.featured.title}
        catalogLink={HOME_PAGE.featured.catalogLink}
        categoryImages={HOME_PAGE.featured.categoryImages}
      />
    </section>
  )
}
