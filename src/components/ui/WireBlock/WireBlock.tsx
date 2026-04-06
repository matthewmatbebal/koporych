import styles from './WireBlock.module.sass'

interface WireBlockProps {
  label: string
  height?: number | string
  className?: string
}

export function WireBlock({ label, height = 120, className = '' }: WireBlockProps) {
  const style = {
    height: typeof height === 'number' ? `${height}px` : height,
  }
  return (
    <div className={`${styles.block} ${className}`} style={style}>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
