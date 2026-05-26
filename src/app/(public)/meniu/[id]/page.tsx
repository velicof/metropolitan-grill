import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, MessageCircle, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { getProductById, getSimilarProducts, getSettings, formatPrice, formatWeight } from '@/lib/data'
import { CATEGORY_EMOJI, RESTAURANT_PHONE, RESTAURANT_PHONE_TEL, WHATSAPP_NUMBER } from '@/lib/demoData'
import ProductCard from '@/components/menu/ProductCard'
import AddToCartButton from '@/components/menu/AddToCartButton'
import type { Badge } from '@/types'

const BADGE_LABELS: Record<Badge, string> = {
  popular: '⭐ Popular',
  spicy: '🌶️ Picant',
  vegetarian: '🌿 Vegetarian',
  nou: '✨ Nou',
  oferta: '🏷️ Ofertă',
}

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id)
  if (!product) return { title: 'Produs negăsit' }
  return { title: product.name, description: product.description }
}

export default async function ProductPage({ params }: Props) {
  const [product, settings] = await Promise.all([
    getProductById(params.id),
    getSettings(),
  ])
  if (!product) notFound()

  const similar = await getSimilarProducts(product.category_id, product.id, 4)
  const phone = settings.phone || RESTAURANT_PHONE
  const phoneHref = `tel:${phone.replace(/\s/g, '') || RESTAURANT_PHONE_TEL}`
  const waNum = settings.whatsapp || WHATSAPP_NUMBER

  const waMessage = `Bună ziua! Aș dori să comand: ${product.name} la prețul de ${product.price.toFixed(2)} lei. Vă rog să mă contactați. Mulțumesc!`
  const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(waMessage)}`

  const emoji = CATEGORY_EMOJI[product.category?.slug ?? ''] ?? product.category?.icon ?? '🌯'

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link
        href="/meniu"
        className="inline-flex items-center gap-2 text-white/50 hover:text-brand-yellow transition-colors mb-6 text-sm"
      >
        <ArrowLeft size={16} />
        Înapoi la meniu
      </Link>

      <div className="md:grid md:grid-cols-2 md:gap-10 mb-12">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-800 mb-6 md:mb-0">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
              <span className="text-8xl opacity-40">{emoji}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {product.category && (
            <Link
              href={`/meniu?categorie=${product.category.slug}`}
              className="text-brand-yellow text-sm font-medium mb-2 hover:underline"
            >
              {product.category.icon} {product.category.name}
            </Link>
          )}

          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">{product.name}</h1>
          <p className="text-white/60 leading-relaxed mb-5">{product.description}</p>

          {product.weight_grams > 0 && (
            <p className="text-sm text-white/50 mb-4">
              Gramaj: <strong className="text-white">{formatWeight(product.weight_grams)}</strong>
            </p>
          )}

          {product.ingredients.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wide mb-2">Ingrediente</h3>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map(ing => (
                  <span key={ing} className="text-xs bg-brand-charcoal border border-white/10 px-2.5 py-1 rounded-full text-white/70">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.badges.map(b => (
                <span key={b} className="text-xs bg-brand-yellow/20 text-brand-yellow px-2 py-1 rounded-full">
                  {BADGE_LABELS[b]}
                </span>
              ))}
            </div>
          )}

          <p className="text-4xl font-black text-brand-yellow mb-6">{formatPrice(product.price)}</p>

          <div className="flex flex-col gap-3 mt-auto">
            <AddToCartButton product={product} />
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-4">
              <MessageCircle size={20} />
              Comandă pe WhatsApp
            </a>
            <a href={phoneHref} className="btn-secondary py-3 justify-center">
              <Phone size={18} />
              Sună: {phone}
            </a>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section>
          <h2 className="section-title mb-2">Îți mai poate plăcea</h2>
          <div className="gradient-line w-20 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {similar.map(p => (
              <ProductCard key={p.id} product={p} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
