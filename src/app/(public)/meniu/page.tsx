import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getCategories, getProducts } from '@/lib/data'
import { countProductsByCategory } from '@/lib/demoData'
import ProductCard from '@/components/menu/ProductCard'
import CategoryFilter from '@/components/menu/CategoryFilter'

export const metadata: Metadata = {
  title: 'Meniu',
  description: 'Meniu Metropolitan Grill — shaorma, grătar, ciorbe, mâncare gătită și multe altele.',
}

export const revalidate = 3600

interface MenuPageProps {
  searchParams: { categorie?: string }
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const slug = searchParams.categorie || 'toate'

  const [categories, products, allProducts] = await Promise.all([
    getCategories(),
    getProducts(slug === 'toate' ? undefined : slug),
    getProducts(),
  ])

  const productCounts = countProductsByCategory(allProducts)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-black text-white mb-2">
          Meniu <span className="text-brand-yellow">Metropolitan Grill</span>
        </h1>
        <p className="text-white/50">{products.length} produse disponibile</p>
        <div className="gradient-line w-20 mt-3" />
      </div>

      <div className="sticky top-16 z-30 -mx-4 px-4 py-3 bg-[#0F0F0F]/95 backdrop-blur-md border-b border-white/5 mb-4">
        <Suspense>
          <CategoryFilter
            categories={categories}
            selected={slug}
            productCounts={productCounts}
            totalCount={allProducts.length}
          />
        </Suspense>
      </div>

      <div className="mt-4">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4">🍽️</span>
            <p className="text-white/50 text-lg">Niciun produs în această categorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} showAddLabel />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
