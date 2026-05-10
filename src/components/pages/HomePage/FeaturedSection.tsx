import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { getFeaturedProducts } from '@/lib/payload/products'
import { getCategoryImages } from '@/lib/payload/categories'
import { getHomePage } from '@/lib/payload/globals'
import styles from './HomePage.module.sass'

export async function FeaturedSection() {
  const [products, homePage, categoryImages] = await Promise.all([
    getFeaturedProducts(),
    getHomePage(),
    getCategoryImages(),
  ])

  return (
    <section className={styles.section}>
      <ProductCatalog
        products={products}
        title={homePage.featured.title}
        catalogLink={homePage.featured.catalogLink}
        categoryImages={categoryImages}
      />
    </section>
  )
}
