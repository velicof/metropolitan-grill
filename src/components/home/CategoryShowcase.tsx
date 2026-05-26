import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryShowcaseProps {
  categories: Category[]
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section className="py-14 max-w-6xl mx-auto px-4">
      <h2 className="section-title mb-2">Explorează meniul</h2>
      <p className="text-white/50 text-sm mb-6">Alege o categorie și comandă rapid</p>
      <div className="gradient-line w-24 mb-8" />

      <div className="grid grid-cols-2 gap-3 md:flex md:overflow-x-auto md:pb-2 md:gap-3 scrollbar-hide">
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/meniu?categorie=${cat.slug}`}
            className="group bg-brand-charcoal border border-white/10 rounded-2xl p-4 md:p-5 md:flex-shrink-0 md:w-[min(140px,22vw)]
                       hover:border-brand-yellow transition-all duration-200
                       hover:shadow-lg hover:shadow-brand-yellow/10 flex flex-col gap-2"
          >
            <span className="text-3xl md:text-4xl">{cat.icon}</span>
            <span className="font-semibold text-white text-sm md:text-base leading-tight group-hover:text-brand-yellow transition-colors">
              {cat.name}
            </span>
            <span className="text-brand-yellow text-xs font-medium mt-auto">Vezi →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
