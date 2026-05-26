'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { RESTAURANT_PHONE_TEL, WHATSAPP_URL } from '@/lib/demoData'

const items = [
  { href: '/', label: 'Acasă', emoji: '🏠', external: false },
  { href: '/meniu', label: 'Meniu', emoji: '🌯', external: false },
  { href: WHATSAPP_URL, label: 'WhatsApp', emoji: '💬', external: true, isWa: true },
  { href: `tel:${RESTAURANT_PHONE_TEL}`, label: 'Sună', emoji: '📞', external: true, isWa: false },
]

export default function MobileBottomBar() {
  const pathname = usePathname()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-brand-yellow bg-[#0F0F0F] safe-bottom"
      aria-label="Navigare rapidă mobilă"
    >
      <div className="grid grid-cols-4 max-w-lg mx-auto">
        {items.map(item => {
          const isActive = !item.external && pathname === item.href
          const className = cn(
            'flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] transition-colors',
            isActive ? 'text-yellow-400' : 'text-white/60',
            item.isWa && !isActive && 'text-[#25D366]'
          )

          const content = (
            <>
              <span className="text-xl leading-none" aria-hidden>{item.emoji}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </>
          )

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.isWa ? '_blank' : undefined}
                rel={item.isWa ? 'noopener noreferrer' : undefined}
                className={className}
              >
                {content}
              </a>
            )
          }

          return (
            <Link key={item.label} href={item.href} className={className}>
              {content}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
