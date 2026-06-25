import styles from './PolicyViewer.module.sass'

interface PolicyViewerProps {
  src: string
  title: string
}

export function PolicyViewer({ src, title }: PolicyViewerProps) {
  return (
    <div className={styles.root}>
      <iframe src={src} title={title} className={styles.frame} />
      <p className={styles.fallback}>
        Если документ не отображается,{' '}
        <a href={src} target="_blank" rel="noopener noreferrer">откройте его в новой вкладке</a>.
      </p>
    </div>
  )
}
