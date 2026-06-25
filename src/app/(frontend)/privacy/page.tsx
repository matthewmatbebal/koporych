import type { Metadata } from 'next'
import { PolicyViewer } from '@/components/pages/PolicyViewer/PolicyViewer'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Копорыч',
}

export default function Page() {
  return <PolicyViewer src="/privacy.pdf" title="Политика конфиденциальности" />
}
