import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'

export const viewport: Viewport = {
  themeColor: '#1C3A1C',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://greendle.vercel.app'),
  title: { template: '%s — Greendle', default: 'Greendle — Farm-to-Door Meal Kits' },
  description: 'Farm-to-door meal kits and groceries. Zero waste. Locally sourced. Carbon-neutral delivery.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    siteName: 'Greendle',
    type: 'website',
    locale: 'en_GB',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Greendle — Farm to Door, Guilt-Free' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
