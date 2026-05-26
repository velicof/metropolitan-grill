'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  selected: string
  productCounts?: Record<string, number>
  totalCount?: number
}

const ALL = { slug: 'toate', name: 'Toate', icon: '🍽️' }

export default function CategoryFilter({
  categories,
  selected,
  productCounts = {},
  totalCount = 0,
}: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selected])

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'toate') {
      params.delete('categorie')
    } else {
      params.set('categorie', slug)
    }
    const qs = params.toString()
    router.push(qs ? `/meniu?${qs}` : '/meniu')
  }

  const allItems = [ALL, ...categories]

  const labelFor = (slug: string, name: string, icon: string) => {
    const count = slug === 'toate' ? totalCount : productCounts[slug]
    if (count !== undefined && count > 0) {
      return `${icon} ${name} (${count})`
    }
    return `${icon} ${name}`
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
      {allItems.map(cat => (
        <button
          key={cat.slug}
          type="button"
          onClick={() => handleSelect(cat.slug)}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap',
            'transition-all duration-200 flex-shrink-0 min-h-[44px]',
            selected === cat.slug
              ? 'bg-yellow-400 text-black'
              : 'bg-zinc-800 text-white/70 hover:text-white hover:bg-zinc-700'
          )}
        >
          <span>{labelFor(cat.slug, cat.name, cat.icon)}</span>
        </button>
      ))}
    </div>
  )
}
