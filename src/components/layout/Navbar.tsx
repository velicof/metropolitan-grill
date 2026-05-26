'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Phone, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/hooks/useCart'
import { RESTAURANT_PHONE, RESTAURANT_PHONE_TEL } from '@/lib/demoData'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Acasă' },
  { href: '/meniu', label: 'Meniu' },
  { href: '/contact', label: 'Contact' },
] as const

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems, openCart } = useCartStore()
  const count = totalItems()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] safe-top isolate">
        <div className="bg-[#0F0F0F]/95 backdrop-blur-md border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 group shrink-0 relative z-10"
            >
              <span className="text-2xl">🌯</span>
              <span className="font-bold text-lg text-white group-hover:text-brand-yellow transition-colors">
                Metropolitan <span className="text-brand-yellow">Grill</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 relative z-10" aria-label="Navigare principală">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-brand-yellow py-2 px-1 cursor-pointer',
                    pathname === link.href ? 'text-brand-yellow' : 'text-white/70'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 shrink-0 relative z-10">
              <a
                href={`tel:${RESTAURANT_PHONE_TEL}`}
                className="hidden md:flex items-center gap-2 text-sm text-white/70 hover:text-brand-yellow transition-colors"
              >
                <Phone size={16} />
                <span>{RESTAURANT_PHONE}</span>
              </a>

              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-white/70 hover:text-brand-yellow transition-colors"
                aria-label="Deschide coșul"
              >
                <ShoppingCart size={22} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-yellow text-black text-[11px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(prev => !prev)}
                className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-brand-charcoal border-b border-white/10 animate-fade-in relative z-10">
            <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Navigare mobilă">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-brand-yellow/10 text-brand-yellow'
                      : 'text-white/80 hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${RESTAURANT_PHONE_TEL}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/5 mt-2 border-t border-white/5"
                onClick={() => setMenuOpen(false)}
              >
                <Phone size={18} className="text-brand-yellow" />
                <span>{RESTAURANT_PHONE}</span>
              </a>
            </nav>
          </div>
        )}
      </header>
      <div className="h-16 shrink-0" aria-hidden />
    </>
  )
}
