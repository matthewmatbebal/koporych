import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { getAllProducts } from '@/lib/payload/products'
import { getCategoryImages } from '@/lib/payload/categories'
import { getSiteData } from '@/lib/payload/globals'
import { isMobileRequest } from '@/lib/device'
import { CATALOG_PAGE } from '@/lib/mock/catalog'
import styles from './CatalogPage.module.sass'

export async function CatalogPage() {
  const isMobile = await isMobileRequest()
  const [products, categoryImages, siteData] = await Promise.all([
    getAllProducts(isMobile),
    getCategoryImages(),
    getSiteData(),
  ])

  return (
    <div className={styles.page}>
      <ProductCatalog
        products={products}
        title={CATALOG_PAGE.title}
        categoryImages={categoryImages}
      />
      <section className={styles.formSection}>
        <ContactForm title={CATALOG_PAGE.form.title} subtitle={CATALOG_PAGE.form.subtitle} contacts={"full"} contactData={siteData}/>
      </section>
    </div>
  )
}
