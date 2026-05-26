'use client'

import { useState } from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCartStore } from '@/hooks/useCart'
import { formatPrice, generateWhatsAppUrl } from '@/lib/data'
import { WHATSAPP_NUMBER as DEMO_WHATSAPP, RESTAURANT_PHONE } from '@/lib/demoData'
import { cn } from '@/lib/utils'
import type { OrderForm } from '@/types'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEMO_WHATSAPP

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore()
  const [step, setStep] = useState<'cart' | 'form'>('cart')
  const [form, setForm] = useState<OrderForm>({
    name: '', phone: '', type: 'ridicare', address: '', notes: '',
  })

  const total = totalPrice()

  const handleWhatsApp = () => {
    if (!form.name || !form.phone) return
    const url = generateWhatsAppUrl(
      WHATSAPP_NUMBER,
      items.map(i => ({ name: i.product.name, quantity: i.quantity, price: i.product.price })),
      form
    )
    window.open(url, '_blank')
    clearCart()
    closeCart()
    setStep('cart')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-[110] backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-[110] w-full max-w-md bg-brand-dark flex flex-col animate-slide-up md:animate-fade-in shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            {step === 'form' && (
              <button
                onClick={() => setStep('cart')}
                className="p-1.5 rounded-lg hover:bg-white/10 mr-1 transition-colors"
              >
                ←
              </button>
            )}
            <ShoppingBag size={20} className="text-brand-yellow" />
            <h2 className="font-bold text-lg">
              {step === 'cart' ? 'Coșul meu' : 'Finalizează comanda'}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Închide"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* STEP 1: Coș */}
          {step === 'cart' && (
            <div className="p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="text-6xl mb-4">🛒</span>
                  <p className="text-white/60 mb-2">Coșul este gol</p>
                  <p className="text-white/40 text-sm">Adaugă produse din meniu</p>
                  <button
                    onClick={closeCart}
                    className="btn-primary mt-6"
                  >
                    Vezi meniul
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3 bg-brand-charcoal rounded-xl p-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-white truncate">{item.product.name}</p>
                        <p className="text-brand-yellow text-sm font-semibold">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-5 text-center font-semibold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-xs text-white/50 w-16 text-right">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Formular */}
          {step === 'form' && (
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Numele tău *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ion Popescu"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Telefon *</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder={RESTAURANT_PHONE}
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              {/* Ridicare / Livrare */}
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Tip comandă</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['ridicare', 'livrare'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setForm({ ...form, type })}
                      className={cn(
                        'py-2.5 rounded-xl text-sm font-medium border transition-all',
                        form.type === type
                          ? 'bg-brand-yellow/20 border-brand-yellow text-brand-yellow'
                          : 'bg-brand-charcoal border-white/10 text-white/60 hover:border-white/30'
                      )}
                    >
                      {type === 'ridicare' ? '🏪 Ridicare' : '🛵 Livrare'}
                    </button>
                  ))}
                </div>
              </div>

              {form.type === 'livrare' && (
                <div>
                  <label className="block text-sm text-white/70 mb-1.5">Adresa de livrare *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Strada, nr, bloc, ap..."
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-white/70 mb-1.5">Mențiuni speciale</label>
                <textarea
                  className="input-field resize-none"
                  rows={2}
                  placeholder="Ex: fără ceapă, extra sos..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              {/* Rezumat */}
              <div className="bg-brand-charcoal rounded-xl p-3 space-y-1">
                {items.map(i => (
                  <div key={i.product.id} className="flex justify-between text-sm">
                    <span className="text-white/70">{i.quantity}x {i.product.name}</span>
                    <span className="text-white/50">{formatPrice(i.product.price * i.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-bold">
                  <span>Total estimativ</span>
                  <span className="text-brand-yellow">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer sticky */}
        {items.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-brand-dark safe-bottom">
            {step === 'cart' ? (
              <>
                <div className="flex justify-between mb-3 text-sm">
                  <span className="text-white/60">Total estimativ</span>
                  <span className="font-bold text-brand-yellow text-base">{formatPrice(total)}</span>
                </div>
                <button
                  onClick={() => setStep('form')}
                  className="btn-primary w-full text-base py-4"
                >
                  Continuă comanda →
                </button>
              </>
            ) : (
              <button
                onClick={handleWhatsApp}
                disabled={!form.name || !form.phone || (form.type === 'livrare' && !form.address)}
                className={cn(
                  'btn-whatsapp w-full text-base py-4',
                  'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100'
                )}
              >
                <MessageCircle size={20} />
                Trimite comanda pe WhatsApp
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
