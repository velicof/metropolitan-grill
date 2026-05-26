import { supabase } from './supabase'
import {
  demoCategories,
  demoProducts,
  demoSettings,
  filterDemoProductsByCategory,
  RESTAURANT_NAME,
} from './demoData'
import type { Product, Category, RestaurantSettings } from '@/types'

// ============================================================
// FUNCȚII FETCH DATE — Supabase cu fallback demo
// ============================================================

function logSupabaseError(context: string, error: unknown) {
  console.error(`[Supabase] ${context}:`, error)
}

function shouldUseDemo<T>(data: T[] | null, error: unknown): boolean {
  if (error) return true
  if (!data || data.length === 0) return true
  return false
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('order_index')

  if (shouldUseDemo(data, error)) {
    if (error) logSupabaseError('categorii', error)
    return demoCategories
  }
  return data as Category[]
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('order_index')

  if (categorySlug && categorySlug !== 'toate') {
    const { data: cat, error: catError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (catError) {
      logSupabaseError('categorie slug', catError)
      return filterDemoProductsByCategory(demoProducts, categorySlug)
    }

    if (cat) {
      query = query.eq('category_id', cat.id)
    }
  }

  const { data, error } = await query

  if (shouldUseDemo(data, error)) {
    if (error) logSupabaseError('produse', error)
    return filterDemoProductsByCategory(demoProducts, categorySlug)
  }
  return data as Product[]
}

export async function getPopularProducts(limit = 6): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .eq('is_popular', true)
    .order('order_index')
    .limit(limit)

  if (shouldUseDemo(data, error)) {
    if (error) logSupabaseError('produse populare', error)
    return demoProducts.filter(p => p.is_popular).slice(0, limit)
  }
  return data as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    if (error) logSupabaseError('produs by id', error)
    return demoProducts.find(p => p.id === id) ?? null
  }
  return data as Product
}

export async function getSimilarProducts(
  categoryId: string,
  excludeId: string,
  limit = 4
): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', excludeId)
    .limit(limit)

  if (shouldUseDemo(data, error)) {
    if (error) logSupabaseError('produse similare', error)
    return demoProducts
      .filter(p => p.category_id === categoryId && p.id !== excludeId)
      .slice(0, limit)
  }
  return data as Product[]
}

export async function getSettings(): Promise<RestaurantSettings> {
  const { data, error } = await supabase.from('settings').select('*').single()

  if (error || !data) {
    if (error) logSupabaseError('setări', error)
    return demoSettings
  }
  return data as RestaurantSettings
}

// ============================================================
// FUNCȚII UTILITARE
// ============================================================

export function formatPrice(price: number): string {
  return `${price.toFixed(2)} lei`
}

export function formatWeight(grams: number): string {
  if (grams === 0) return ''
  if (grams >= 1000) return `${(grams / 1000).toFixed(1)} kg`
  return `${grams}g`
}

export function generateWhatsAppUrl(
  whatsappNumber: string,
  items: { name: string; quantity: number; price: number }[],
  form: { name: string; phone: string; type: string; address: string; notes: string }
): string {
  const itemsText = items
    .map(i => `  • ${i.quantity}x ${i.name} — ${formatPrice(i.price * i.quantity)}`)
    .join('\n')

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const deliveryLine =
    form.type === 'livrare' ? '🚗 Livrare la adresă' : '🚗 Ridicare din local'

  const message = [
    `🌯 *Comandă nouă — ${RESTAURANT_NAME}*`,
    '_Afacere de familie · Ingrediente proaspete zilnic_',
    '',
    '*Produse:*',
    itemsText,
    '',
    `*Total estimativ: ${formatPrice(total)}*`,
    '──────────────────',
    `👤 Nume: ${form.name}`,
    `📞 Telefon: ${form.phone}`,
    deliveryLine,
    ...(form.type === 'livrare' && form.address ? [`📍 Adresă: ${form.address}`] : []),
    ...(form.notes ? [`📝 Mențiuni: ${form.notes}`] : []),
    '',
    '_Vă mulțumim că ați ales Metropolitan Grill!_',
  ].join('\n')

  const encoded = encodeURIComponent(message)
  return `https://wa.me/${whatsappNumber}?text=${encoded}`
}
