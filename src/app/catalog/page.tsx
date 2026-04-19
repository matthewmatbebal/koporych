import { ProductCatalog } from '@/components/ui/ProductCatalog/ProductCatalog'
import { PRODUCTS } from '@/lib/products'
import styles from './page.module.sass'

export default function CatalogPage() {
  return (
    <div className={styles.page}>
      <h1>Каталог</h1>
      <ProductCatalog products={PRODUCTS} allLabel="Все" />
    </div>
  )
}
