'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { SearchDoc } from '@/app/api/search/route'
import styles from './SearchModal.module.sass'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchDoc[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setResults(data.results ?? [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const products = results.filter(r => r.type === 'product')
  const pages = results.filter(r => r.type === 'page')
  const hasResults = results.length > 0
  const showEmpty = query.trim() && !loading && !hasResults

  return (
    <div
      className={cn(styles.overlay, { [styles.overlayOpen]: open })}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className={cn(styles.modal, { [styles.modalOpen]: open })}>
        <div className={styles.inputWrap}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            type="search"
            placeholder="Поиск по сайту..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">✕</button>
        </div>

        <div className={styles.body}>
          {!query.trim() && (
            <p className={styles.hint}>Начните вводить для поиска</p>
          )}

          {loading && (
            <p className={styles.hint}>Ищем...</p>
          )}

          {showEmpty && (
            <p className={styles.hint}>Ничего не найдено</p>
          )}

          {hasResults && (
            <div className={styles.results}>
              {products.length > 0 && (
                <div className={styles.group}>
                  <span className={styles.groupLabel}>Товары</span>
                  {products.map(doc => (
                    <Link
                      key={doc.id}
                      href={doc.url}
                      className={styles.resultItem}
                      onClick={onClose}
                    >
                      <div className={styles.productThumb}>
                        {doc.image && (
                          <Image src={doc.image} alt="" fill style={{ objectFit: 'cover' }} />
                        )}
                      </div>
                      <div className={styles.resultText}>
                        <span className={styles.resultTitle}>{doc.title}</span>
                        {doc.subtitle && (
                          <span className={styles.resultSub}>{doc.subtitle}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {pages.length > 0 && (
                <div className={styles.group}>
                  <span className={styles.groupLabel}>Страницы</span>
                  {pages.map(doc => (
                    <Link
                      key={doc.id}
                      href={doc.url}
                      className={styles.resultItem}
                      onClick={onClose}
                    >
                      <div className={styles.pageIcon}>
                        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                          <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className={styles.resultText}>
                        <span className={styles.resultTitle}>{doc.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
