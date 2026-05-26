'use client'

import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/hooks/useCart'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, openCart } = useCartStore()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    toast.success(`${product.name} adăugat în coș! 🌯`)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
        added
          ? 'bg-green-500 text-white'
          : 'bg-brand-yellow hover:bg-brand-accent text-brand-darker'
      }`}
    >
      {added ? (
        <>
          <Check size={20} />
          Adăugat în coș!
        </>
      ) : (
        <>
          <ShoppingCart size={20} />
          Adaugă în coș
        </>
      )}
    </button>
  )
}
