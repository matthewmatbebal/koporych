'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './CustomSelect.module.sass'

interface CustomSelectProps {
  label: string
  options: string[]
  name?: string
}

export function CustomSelect({ label, options, name }: CustomSelectProps) {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function select(opt: string) {
    setValue(opt)
    setOpen(false)
  }

  return (
    <div
      ref={ref}
      className={`${styles.field} ${value ? styles.hasValue : ''} ${open ? styles.isOpen : ''}`}
    >
      <input type="hidden" name={name} value={value} />
      <button type="button" className={styles.trigger} onClick={() => setOpen(o => !o)}>
        <span className={styles.triggerValue}>{value}</span>
        <span className={styles.arrow}>↓</span>
      </button>
      <span className={styles.label}>{label}</span>
      {open && (
        <ul className={styles.dropdown}>
          {options.map(opt => (
            <li
              key={opt}
              className={`${styles.option} ${opt === value ? styles.optionActive : ''}`}
              onClick={() => select(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
