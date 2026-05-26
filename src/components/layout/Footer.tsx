import Link from 'next/link'
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import {
  GOOGLE_MAPS_URL,
  RESTAURANT_ADDRESS,
  RESTAURANT_NAME,
  RESTAURANT_PHONE,
  RESTAURANT_PHONE_TEL,
  WHATSAPP_NUMBER,
} from '@/lib/demoData'

export default function Footer() {
  return (
    <footer className="bg-brand-card border-t border-white/5 mt-16 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌯</span>
              <span className="font-bold text-lg text-brand-text">
                Metropolitan <span className="text-brand-yellow">Grill</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Afacere de familie în Prelungirea Ghencea. Cartofi proaspeți, carne la grătar, sosuri
              preparate în casă. Gătit zilnic, cu grijă.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-brand-text mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-white/60">
              <a href={`tel:${RESTAURANT_PHONE_TEL}`} className="flex items-center gap-2 hover:text-brand-yellow transition-colors">
                <Phone size={15} className="text-brand-yellow flex-shrink-0" />
                <span>{RESTAURANT_PHONE}</span>
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle size={15} className="text-[#25D366] flex-shrink-0" />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-brand-yellow flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-brand-yellow flex-shrink-0" />
                <span>Luni–Duminică: 10:00 – 23:00</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-brand-text mb-4">Navigare</h3>
            <nav className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Acasă' },
                { href: '/meniu', label: 'Meniu complet' },
                { href: '/contact', label: 'Contact & Locație' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 hover:text-brand-yellow transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} {RESTAURANT_NAME}. Toate drepturile rezervate.</p>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
            {RESTAURANT_ADDRESS}
          </a>
        </div>
      </div>
    </footer>
  )
}
