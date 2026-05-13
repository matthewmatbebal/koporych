'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const YM_ID = 109184312

declare global {
  interface Window {
    ym?: unknown
    dataLayer?: unknown[]
  }
}

function ymCall(action: string, ...args: unknown[]) {
  if (typeof window.ym === 'function') {
    window.ym(YM_ID, action, ...args)
  }
}

function YandexMetrikaHit() {
  const pathname = usePathname()
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    ymCall('hit', window.location.href, { referrer: document.referrer })
  }, [pathname])

  return null
}

export function YandexMetrika() {
  return (
    <>
      <Script
        id="ym"
        src={`https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}`}
        strategy="afterInteractive"
        onReady={() => ymCall('init', {
          ssr: true,
          webvisor: true,
          clickmap: true,
          ecommerce: 'dataLayer',
          referrer: document.referrer,
          url: location.href,
          accurateTrackBounce: true,
          trackLinks: true,
        })}
      />
      <noscript>
        <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{position:'absolute',left:'-9999px'}} alt="" />
      </noscript>
      <YandexMetrikaHit />
    </>
  )
}
