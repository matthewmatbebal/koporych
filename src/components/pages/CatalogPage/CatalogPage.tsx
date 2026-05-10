import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { getAllProducts } from '@/lib/payload/products'
import { getCategoryImages } from '@/lib/payload/categories'
import { CATALOG_PAGE } from '@/lib/mock/catalog'
import styles from './CatalogPage.module.sass'

export async function CatalogPage() {
  const [products, categoryImages] = await Promise.all([
    getAllProducts(),
    getCategoryImages(),
  ])

  return (
    <div className={styles.page}>
      <ProductCatalog
        products={products}
        title={CATALOG_PAGE.title}
        categoryImages={categoryImages}
      />
      <section className={styles.formSection}>
        <ContactForm title={CATALOG_PAGE.form.title} subtitle={CATALOG_PAGE.form.subtitle} contacts={"full"}/>
      </section>
    </div>
  )
}
