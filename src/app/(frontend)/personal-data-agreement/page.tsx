import type { Metadata } from 'next'
import { PolicyViewer } from '@/components/pages/PolicyViewer/PolicyViewer'

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных — Копорыч',
}

export default function Page() {
  return <PolicyViewer src="/consent.pdf" title="Согласие на обработку персональных данных" />
}
