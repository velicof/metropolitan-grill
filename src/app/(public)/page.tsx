import Link from 'next/link'
import { MapPin, Clock, ChevronRight, MessageCircle, Star } from 'lucide-react'
import { getPopularProducts, getCategories, getSettings } from '@/lib/data'
import {
  GOOGLE_MAPS_URL,
  RESTAURANT_ADDRESS,
  RESTAURANT_NAME,
  RESTAURANT_PHONE,
  RESTAURANT_PHONE_TEL,
  WHATSAPP_URL,
} from '@/lib/demoData'
import ProductCard from '@/components/menu/ProductCard'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import WhyUsSection from '@/components/home/WhyUsSection'
import OurStorySection from '@/components/home/OurStorySection'

export const revalidate = 3600

const REVIEWS = [
  {
    name: 'Mihai T.',
    stars: 5,
    text: 'Shaorma de berbecuț e senzațională. Carne fragedă, porție generoasă. Deja am venit de 3 ori săptămâna asta!',
    date: 'acum 3 zile',
  },
  {
    name: 'Andreea M.',
    stars: 5,
    text: 'Ciorbele sunt ca la mama acasă. Și shaorma mixtă e de top. Recomand cu căldură!',
    date: 'acum 5 zile',
  },
  {
    name: 'Bogdan C.',
    stars: 5,
    text: 'Singurul loc din Ghencea unde găsești mâncare gătită și shaorma sub același acoperiș. Prețuri corecte!',
    date: 'acum o săptămână',
  },
]

const SCHEDULE_DAYS = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică']

export default async function HomePage() {
  const [popularProducts, categories, settings] = await Promise.all([
    getPopularProducts(6),
    getCategories(),
    getSettings(),
  ])

  const mapsUrl = settings.google_maps_url || GOOGLE_MAPS_URL

  return (
    <div>
      <section className="relative min-h-[100vh] md:min-h-[92vh] flex items-end pb-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A]" />
        <div className="hero-grain" aria-hidden />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.5) 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/[0.06] via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-brand-yellow text-sm font-semibold mb-4 bg-brand-yellow/10 border border-brand-yellow/25 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-pulse" />
              Deschis acum · Prelungirea Ghencea
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none mb-4">
              {RESTAURANT_NAME}
            </h1>
            <p className="text-xl md:text-2xl font-bold text-brand-yellow mb-4">
              Shaorma · Grătar · Mâncare Gătită
            </p>
            <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              Afacere de familie cu ingrediente proaspete zilnic. Cartofi tăiați în casă, carne la
              grătar, sosuri proprii. Prelungirea Ghencea nr. 323, București.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/meniu" className="btn-primary text-base py-4 px-8 justify-center">
                🌯 Vezi meniul
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base py-4 px-8 justify-center"
              >
                💬 Comandă pe WhatsApp
              </a>
              <a
                href={`tel:${RESTAURANT_PHONE_TEL}`}
                className="btn-secondary text-base py-4 px-8 justify-center border-white/30"
              >
                📞 {RESTAURANT_PHONE}
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              <span className="trust-badge">🔥 Grătar zilnic</span>
              <span className="trust-badge">🏠 Mâncare ca acasă</span>
              <span className="trust-badge">⚡ Comandă rapidă WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      <WhyUsSection />
      <OurStorySection />

      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Cele mai comandate</h2>
            <div className="gradient-line w-24 mt-2" />
          </div>
          <Link
            href="/meniu"
            className="flex items-center gap-1 text-brand-yellow text-sm font-medium hover:gap-2 transition-all"
          >
            Vezi tot
            <ChevronRight size={16} />
          </Link>
        </div>
        {popularProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-center py-8">Meniu în curs de încărcare...</p>
        )}
      </section>

      <CategoryShowcase categories={categories} />

      <section className="bg-gradient-to-r from-[#0d2818] to-[#145a32] border-y border-[#25D366]/30">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Comandă rapid pe WhatsApp</h2>
            <p className="text-white/70 text-lg">Răspundem în câteva minute</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-lg py-4 px-10 flex-shrink-0"
          >
            <MessageCircle size={22} />
            Comandă acum
          </a>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-brand-charcoal rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <Clock size={22} className="text-brand-yellow" />
              <h3 className="text-xl font-bold text-white">Program</h3>
            </div>
            <div className="space-y-2 text-sm">
              {SCHEDULE_DAYS.map(day => (
                <div key={day} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/70">{day}</span>
                  <span className="text-brand-yellow font-semibold">10:00 – 23:00</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-charcoal rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={22} className="text-brand-yellow" />
              <h3 className="text-xl font-bold text-white">Locație</h3>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">{RESTAURANT_ADDRESS}</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full py-3 justify-center"
            >
              <MapPin size={18} />
              Deschide în Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 bg-brand-charcoal/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title text-center mb-2">Ce spun clienții</h2>
          <div className="gradient-line w-24 mx-auto mb-10" />
          <div className="grid md:grid-cols-3 gap-4">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-brand-charcoal rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} size={14} className="text-brand-yellow fill-brand-yellow" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white">{review.name}</span>
                  <span className="text-xs text-white/30">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
