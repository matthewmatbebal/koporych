import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { PRODUCTS } from '@/lib/products'
import { CATALOG_PAGE } from '@/lib/mock/catalog'
import styles from './CatalogPage.module.sass'

export function CatalogPage() {
  return (
    <div className={styles.page}>
      <ProductCatalog
        products={PRODUCTS}
        title={CATALOG_PAGE.title}
        categoryImages={CATALOG_PAGE.categoryImages}
      />
      <section className={styles.formSection}>
        <ContactForm title={CATALOG_PAGE.form.title} subtitle={CATALOG_PAGE.form.subtitle} />
      </section>
    </div>
  )
}
