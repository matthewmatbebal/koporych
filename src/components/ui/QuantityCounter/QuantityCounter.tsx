import styles from './QuantityCounter.module.sass'

interface QuantityCounterProps {
  value: number
  onChange?: (value: number) => void
  className?: string
}

export function QuantityCounter({ value, onChange, className }: QuantityCounterProps) {
  return (
    <div className={`${styles.counter}${className ? ` ${className}` : ''}`}>
      <button type="button" className={styles.btn} onClick={() => onChange?.(value - 1)}>−</button>
      <span className={styles.val}>{value}</span>
      <button type="button" className={styles.btn} onClick={() => onChange?.(value + 1)}>+</button>
    </div>
  )
}
