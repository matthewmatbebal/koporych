import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { getFeaturedProducts } from '@/lib/payload/products'
import { getCategoryImages } from '@/lib/payload/categories'
import styles from './HomePage.module.sass'

interface FeaturedSectionProps {
  isMobile: boolean
  featuredTitle: string
  catalogLink: string
}

export async function FeaturedSection({ isMobile, featuredTitle, catalogLink }: FeaturedSectionProps) {
  const [products, categoryImages] = await Promise.all([
    getFeaturedProducts(isMobile),
    getCategoryImages(),
  ])

  return (
    <section className={styles.section}>
      <ProductCatalog
        products={products}
        title={featuredTitle}
        catalogLink={catalogLink}
        categoryImages={categoryImages}
      />
    </section>
  )
}
