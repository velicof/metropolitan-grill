'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus, Flame, Leaf, Star, Sparkles, Tag } from 'lucide-react'
import { useCartStore } from '@/hooks/useCart'
import { formatPrice, formatWeight } from '@/lib/data'
import { CATEGORY_EMOJI } from '@/lib/demoData'
import { cn } from '@/lib/utils'
import type { Product, Badge } from '@/types'
import toast from 'react-hot-toast'

function getQualityBadge(product: Product): string | null {
  const slug = product.category?.slug ?? ''
  const nameLower = product.name.toLowerCase()

  if (slug === 'garnituri' && nameLower.includes('cartofi')) {
    return '🥔 Proaspăt'
  }
  if (slug === 'gratar' || slug.includes('shaorma')) {
    return '🔥 Zilnic'
  }
  return null
}

const BADGE_CONFIG: Record<Badge, { label: string; Icon: React.ElementType; className: string }> = {
  popular:    { label: 'Popular',    Icon: Star,     className: 'badge-popular' },
  spicy:      { label: 'Picant',     Icon: Flame,    className: 'badge-spicy' },
  vegetarian: { label: 'Vegetarian', Icon: Leaf,     className: 'badge-vegetarian' },
  nou:        { label: 'Nou',        Icon: Sparkles, className: 'badge-nou' },
  oferta:     { label: 'Ofertă',     Icon: Tag,      className: 'badge-oferta' },
}

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact'
  showAddLabel?: boolean
}

export default function ProductCard({ product, variant = 'default', showAddLabel = false }: ProductCardProps) {
  const { addItem } = useCartStore()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name} adăugat în coș!`)
  }

  const isCompact = variant === 'compact'
  const categorySlug = product.category?.slug ?? 'shaorma-kebab'
  const placeholderEmoji = CATEGORY_EMOJI[categorySlug] ?? product.category?.icon ?? '🌯'
  const displayBadges = [
    ...(product.is_popular && !product.badges.includes('popular') ? (['popular'] as Badge[]) : []),
    ...product.badges,
  ]
  const qualityBadge = getQualityBadge(product)

  return (
    <article className="product-card group flex flex-col h-full bg-brand-charcoal">
      <Link href={`/meniu/${product.id}`} className="block flex-1">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
              <span className={cn('opacity-40', isCompact ? 'text-5xl' : 'text-6xl')}>{placeholderEmoji}</span>
            </div>
          )}

          {displayBadges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
              {displayBadges.slice(0, 2).map(badge => {
                const config = BADGE_CONFIG[badge]
                if (!config) return null
                return (
                  <span key={badge} className={cn('badge', config.className)}>
                    <config.Icon size={10} />
                    {config.label}
                  </span>
                )
              })}
            </div>
          )}

          {product.weight_grams > 0 && (
            <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-white bg-black/70 px-2 py-0.5 rounded z-10">
              {formatWeight(product.weight_grams)}
            </span>
          )}
        </div>

        <div className="p-3 flex-1 flex flex-col">
          <div className="flex items-start gap-2 mb-1 flex-wrap">
            <h3 className={cn('font-bold text-white leading-tight', isCompact ? 'text-sm' : 'text-base')}>
              {product.name}
            </h3>
            {qualityBadge && (
              <span className="text-[10px] bg-zinc-700 text-zinc-300 px-1.5 py-0.5 rounded-full flex-shrink-0">
                {qualityBadge}
              </span>
            )}
          </div>
          {!isCompact && (
            <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-2 flex-1">
              {product.description}
            </p>
          )}
          <p className="font-bold text-brand-yellow text-lg">{formatPrice(product.price)}</p>
        </div>
      </Link>

      <div className="px-3 pb-3">
        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-all',
            'bg-brand-yellow text-black hover:bg-brand-accent active:scale-[0.98]',
            isCompact ? 'py-2' : 'py-2.5'
          )}
          aria-label={`Adaugă ${product.name} în coș`}
        >
          <Plus size={18} />
          {showAddLabel ? 'Adaugă în coș' : 'Adaugă'}
        </button>
      </div>
    </article>
  )
}
