'use client'

import { useEffect, useState } from 'react'
import styles from './Toast.module.sass'

interface ToastProps {
  message: string
  onDone: () => void
  duration?: number
}

export function Toast({ message, onDone, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10)
    const hide = setTimeout(() => setVisible(false), duration)
    const done = setTimeout(onDone, duration + 300)
    return () => { clearTimeout(show); clearTimeout(hide); clearTimeout(done) }
  }, [duration, onDone])

  return (
    <div className={`${styles.toast} ${visible ? styles.toastVisible : ''}`}>
      {message}
    </div>
  )
}
