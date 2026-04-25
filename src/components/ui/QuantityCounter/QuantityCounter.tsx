import styles from './QuantityCounter.module.sass'

interface QuantityCounterProps {
  value: number
  className?: string
}

export function QuantityCounter({ value, className }: QuantityCounterProps) {
  return (
    <div className={`${styles.counter}${className ? ` ${className}` : ''}`}>
      <button className={styles.btn}>−</button>
      <span className={styles.val}>{value}</span>
      <button className={styles.btn}>+</button>
    </div>
  )
}
