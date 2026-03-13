import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://greendle.vercel.app'),
  title: { template: '%s — Greendle', default: 'Greendle — Farm-to-Door Meal Kits' },
  description: 'Farm-to-door meal kits and groceries. Zero waste. Locally sourced. Carbon-neutral delivery.',
  openGraph: {
    siteName: 'Greendle',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
