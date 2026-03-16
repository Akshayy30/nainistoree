import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NainiStore — 35 Minute Delivery in Nainital',
  description: 'Momos, medicines, woollens and sweets from Nainital\'s best local stores delivered in 35 minutes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
