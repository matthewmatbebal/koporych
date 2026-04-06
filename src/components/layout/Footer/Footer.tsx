import { WireBlock } from '@/components/ui/WireBlock/WireBlock'
import styles from './Footer.module.sass'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <WireBlock label="Футер" height={280} />
      </div>
    </footer>
  )
}
