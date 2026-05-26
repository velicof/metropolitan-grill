'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Category } from '@/types'
import toast from 'react-hot-toast'

const EMPTY_FORM = { name: '', slug: '', icon: '🍽️', order_index: 0, is_active: true }

function toSlug(name: string) {
  return name.toLowerCase()
    .replace(/ă/g,'a').replace(/â/g,'a').replace(/î/g,'i')
    .replace(/ș/g,'s').replace(/ț/g,'t').replace(/ş/g,'s').replace(/ţ/g,'t')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    const { data } = await supabase.from('categories').select('*').order('order_index')
    setCategories((data as Category[]) || [])
    setLoading(false)
  }

  function openAdd() {
    setForm({ ...EMPTY_FORM, order_index: categories.length + 1 })
    setEditId(null)
    setShowForm(true)
  }

  function openEdit(c: Category) {
    setForm({ name: c.name, slug: c.slug, icon: c.icon, order_index: c.order_index, is_active: c.is_active })
    setEditId(c.id)
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name) { toast.error('Completează numele!'); return }
    const payload = { ...form, slug: form.slug || toSlug(form.name) }
    let error
    if (editId) {
      ;({ error } = await supabase.from('categories').update(payload).eq('id', editId))
    } else {
      ;({ error } = await supabase.from('categories').insert(payload))
    }
    if (error) { toast.error('Eroare: ' + error.message) }
    else { toast.success(editId ? 'Categorie actualizată!' : 'Categorie adăugată!'); setShowForm(false); loadData() }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Ștergi categoria "${name}"? Produsele din ea nu vor fi șterse.`)) return
    await supabase.from('categories').delete().eq('id', id)
    toast.success('Categorie ștearsă')
    loadData()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Categorii</h1>
          <p className="text-white/40 text-sm mt-0.5">{categories.length} categorii</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={18} /> Adaugă categorie
        </button>
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-16">Se încarcă...</div>
      ) : (
        <div className="space-y-2">
          {categories.map(c => (
            <div key={c.id} className="flex items-center gap-4 bg-brand-charcoal rounded-xl px-4 py-3 border border-white/5">
              <GripVertical size={16} className="text-white/20 cursor-grab" />
              <span className="text-2xl">{c.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-white text-sm">{c.name}</p>
                <p className="text-xs text-white/40">/{c.slug}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {c.is_active ? 'Activă' : 'Inactivă'}
              </span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-white/30 hover:text-brand-orange hover:bg-brand-orange/10 transition-colors">
                  <Edit size={15} />
                </button>
                <button onClick={() => handleDelete(c.id, c.name)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-brand-dark rounded-2xl w-full max-w-sm border border-white/10">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-bold">{editId ? 'Editează categoria' : 'Categorie nouă'}</h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Emoji icon</label>
                <input className="input-field text-2xl" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Nume *</label>
                <input className="input-field" placeholder="Shaorma" value={form.name}
                  onChange={e => setForm({...form, name: e.target.value, slug: toSlug(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Slug URL</label>
                <input className="input-field" placeholder="shaorma" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Ordine (1 = primul)</label>
                <input type="number" className="input-field" value={form.order_index} onChange={e => setForm({...form, order_index: parseInt(e.target.value)})} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="accent-brand-orange" />
                <span className="text-sm text-white/70">Categorie activă</span>
              </label>
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
