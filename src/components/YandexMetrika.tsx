'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const YM_ID = 109184312

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function YandexMetrikaHit() {
  const pathname = usePathname()

  useEffect(() => {
    window.ym?.(YM_ID, 'hit', window.location.href, {
      referrer: document.referrer,
    })
  }, [pathname])

  return null
}

export function YandexMetrika() {
  return (
    <>
      <Script id="ym" strategy="afterInteractive">{`
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');
        ym(${YM_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
      `}</Script>
      <noscript>
        <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{position:'absolute',left:'-9999px'}} alt="" />
      </noscript>
      <YandexMetrikaHit />
    </>
  )
}
