import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { RESTAURANT_ADDRESS, RESTAURANT_NAME } from '@/lib/demoData'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${RESTAURANT_NAME} — Shaorma autentică în Prelungirea Ghencea`,
    template: `%s | ${RESTAURANT_NAME}`,
  },
  description:
    `Shaorma de pui, berbecuț și mixtă. ${RESTAURANT_ADDRESS}. Comandă pe WhatsApp!`,
  keywords: ['shaorma', 'metropolitan grill', 'ghencea', 'fast food', 'restaurant'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Metropolitan Grill',
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    siteName: RESTAURANT_NAME,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={dmSans.variable}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-brand-darker text-brand-text font-body antialiased">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#F5F5F5',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: {
              iconTheme: { primary: '#F5C518', secondary: '#0F0F0F' },
            },
          }}
        />
      </body>
    </html>
  )
}
