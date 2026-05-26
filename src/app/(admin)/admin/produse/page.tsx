'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatPrice, formatWeight } from '@/lib/data'
import type { Product, Category, Badge } from '@/types'
import Image from 'next/image'
import toast from 'react-hot-toast'

const BADGE_OPTIONS: Badge[] = ['popular', 'spicy', 'vegetarian', 'nou', 'oferta']
const BADGE_LABELS: Record<Badge, string> = {
  popular: 'Popular', spicy: 'Picant', vegetarian: 'Vegetarian', nou: 'Nou', oferta: 'Ofertă',
}

const EMPTY_FORM = {
  name: '', description: '', price: '', weight_grams: '', image_url: '',
  category_id: '', badges: [] as Badge[], is_active: true, is_popular: false,
  ingredients: '',
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from('products').select('*, category:categories(*)').order('order_index'),
      supabase.from('categories').select('*').order('order_index'),
    ])
    setProducts((prods as Product[]) || [])
    setCategories((cats as Category[]) || [])
    setLoading(false)
  }

  function openAdd() {
    setForm(EMPTY_FORM)
    setEditId(null)
    setShowForm(true)
  }

  function openEdit(p: Product) {
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      weight_grams: String(p.weight_grams),
      image_url: p.image_url || '',
      category_id: p.category_id,
      badges: p.badges,
      is_active: p.is_active,
      is_popular: p.is_popular,
      ingredients: p.ingredients.join(', '),
    })
    setEditId(p.id)
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name || !form.price || !form.category_id) {
      toast.error('Completează câmpurile obligatorii!')
      return
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      weight_grams: parseInt(form.weight_grams) || 0,
      image_url: form.image_url || null,
      category_id: form.category_id,
      badges: form.badges,
      is_active: form.is_active,
      is_popular: form.is_popular,
      ingredients: form.ingredients.split(',').map(i => i.trim()).filter(Boolean),
    }

    let error
    if (editId) {
      ;({ error } = await supabase.from('products').update(payload).eq('id', editId))
    } else {
      ;({ error } = await supabase.from('products').insert(payload))
    }

    if (error) {
      toast.error('Eroare la salvare: ' + error.message)
    } else {
      toast.success(editId ? 'Produs actualizat!' : 'Produs adăugat!')
      setShowForm(false)
      loadData()
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Ștergi "${name}"? Acțiunea nu poate fi anulată.`)) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      toast.error('Eroare la ștergere')
    } else {
      toast.success('Produs șters')
      loadData()
    }
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from('products').update({ is_active: !current }).eq('id', id)
    loadData()
  }

  async function togglePopular(id: string, current: boolean) {
    await supabase.from('products').update({ is_popular: !current, badges: current
      ? [] : ['popular'] }).eq('id', id)
    loadData()
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Produse</h1>
          <p className="text-white/40 text-sm mt-0.5">{products.length} produse total</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={18} /> Adaugă produs
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Caută produs..."
          className="input-field pl-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Products table */}
      {loading ? (
        <div className="text-white/40 text-center py-16">Se încarcă...</div>
      ) : (
        <div className="bg-brand-charcoal rounded-2xl border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs text-white/40 uppercase tracking-wide">
                <th className="px-4 py-3">Produs</th>
                <th className="px-4 py-3">Categorie</th>
                <th className="px-4 py-3 text-right">Preț</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-dark overflow-hidden flex-shrink-0">
                        {p.image_url ? (
                          <Image src={p.image_url} alt={p.name} width={40} height={40} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">🌯</div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{p.name}</p>
                        <p className="text-xs text-white/40">{formatWeight(p.weight_grams)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-white/60">
                      {(p.category as Category)?.name || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold text-brand-orange text-sm">{formatPrice(p.price)}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                      p.is_active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {p.is_active ? 'Activ' : 'Inactiv'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => togglePopular(p.id, p.is_popular)}
                        title={p.is_popular ? 'Scoate din populare' : 'Marchează popular'}
                        className={`p-1.5 rounded-lg transition-colors ${p.is_popular ? 'text-brand-yellow hover:bg-brand-yellow/10' : 'text-white/30 hover:text-brand-yellow hover:bg-brand-yellow/10'}`}
                      >
                        <Star size={15} />
                      </button>
                      <button
                        onClick={() => toggleActive(p.id, p.is_active)}
                        title={p.is_active ? 'Dezactivează' : 'Activează'}
                        className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {p.is_active ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg text-white/30 hover:text-brand-orange hover:bg-brand-orange/10 transition-colors"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/30">Niciun produs găsit</div>
          )}
        </div>
      )}

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-brand-dark rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-bold text-lg">{editId ? 'Editează produs' : 'Produs nou'}</h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Nume *</label>
                <input className="input-field" placeholder="Shaorma Clasică Pui" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Descriere</label>
                <textarea className="input-field resize-none" rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Preț (lei) *</label>
                  <input type="number" step="0.5" className="input-field" placeholder="25.00" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Gramaj (g)</label>
                  <input type="number" className="input-field" placeholder="380" value={form.weight_grams} onChange={e => setForm({...form, weight_grams: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Categorie *</label>
                <select className="input-field" value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})}>
                  <option value="">Selectează categoria</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">URL Imagine</label>
                <input className="input-field" placeholder="https://..." value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Ingrediente (separate prin virgulă)</label>
                <input className="input-field" placeholder="pui marinat, salată, roșii, sos alb" value={form.ingredients} onChange={e => setForm({...form, ingredients: e.target.value})} />
              </div>
              {/* Badges */}
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Badge-uri</label>
                <div className="flex flex-wrap gap-2">
                  {BADGE_OPTIONS.map(b => (
                    <label key={b} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.badges.includes(b)}
                        onChange={e => {
                          const newBadges = e.target.checked
                            ? [...form.badges, b]
                            : form.badges.filter(x => x !== b)
                          setForm({...form, badges: newBadges})
                        }}
                        className="accent-brand-orange"
                      />
                      <span className="text-sm text-white/70">{BADGE_LABELS[b]}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="accent-brand-orange" />
                  <span className="text-sm text-white/70">Activ</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_popular} onChange={e => setForm({...form, is_popular: e.target.checked})} className="accent-brand-orange" />
                  <span className="text-sm text-white/70">Popular</span>
                </label>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-white/10 flex gap-3">
              <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 py-2.5">Anulează</button>
              <button onClick={handleSave} className="btn-primary flex-1 py-2.5">Salvează</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
