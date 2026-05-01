import { ContactForm } from '@/components/ui/ContactForm/ContactForm'
import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { PRODUCTS } from '@/lib/products'
import styles from './CatalogPage.module.sass'

export function CatalogPage() {
  return (
    <div className={styles.page}>
      <ProductCatalog
        products={PRODUCTS}
        title="Каталог"
        categoryImages={{
          'Рассыпной': '/images/grass.jpg',
          'Пирамидки': '/images/pyramids.jpg',
          'Развес': '/images/classic.jpg',
        }}
      />
      <section className={styles.formSection}>
        <ContactForm title="Не нашли, что искали?" subtitle="Ответим на любые вопросы и поможем индивидуально подобрать чай" />
      </section>
    </div>
  )
}
