import type { Category, Product, RestaurantSettings } from '@/types'

const NOW = '2024-01-01T00:00:00.000Z'

export const RESTAURANT_NAME = 'Metropolitan Grill'
export const RESTAURANT_ADDRESS = 'Prelungirea Ghencea nr. 323, București'
export const RESTAURANT_CITY = 'București'
export const RESTAURANT_PHONE = '0779 299 788'
export const RESTAURANT_PHONE_TEL = '0779299788'
export const WHATSAPP_NUMBER = '40779299788'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Prelungirea+Ghencea+323+Bucuresti'

export const GOOGLE_MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Prelungirea+Ghencea+323+Bucuresti&output=embed'

// ============================================================
// CATEGORII — doar ce există în realitate la Metropolitan Grill
// ============================================================
export const demoCategories: Category[] = [
  { id: 'cat-shaorma-kebab', name: 'Shaorma & Kebab', slug: 'shaorma-kebab', icon: '🌯', order_index: 1, is_active: true, created_at: NOW },
  { id: 'cat-pui', name: 'Preparate Pui', slug: 'pui', icon: '🍗', order_index: 2, is_active: true, created_at: NOW },
  { id: 'cat-meniuri', name: 'Meniuri', slug: 'meniuri', icon: '🍱', order_index: 3, is_active: true, created_at: NOW },
  { id: 'cat-garnituri', name: 'Garnituri', slug: 'garnituri', icon: '🍟', order_index: 4, is_active: true, created_at: NOW },
  { id: 'cat-sosuri', name: 'Sosuri', slug: 'sosuri', icon: '🥫', order_index: 5, is_active: true, created_at: NOW },
  { id: 'cat-bauturi', name: 'Băuturi', slug: 'bauturi', icon: '🥤', order_index: 6, is_active: true, created_at: NOW },
]

const cat = (slug: string) => demoCategories.find(c => c.slug === slug)!

// ============================================================
// PRODUSE — bazate pe pozele reale din restaurant
// ============================================================
export const demoProducts: Product[] = [

  // ── SHAORMA & KEBAB ──────────────────────────────────────
  {
    id: 'demo-1',
    category_id: cat('shaorma-kebab').id,
    category: cat('shaorma-kebab'),
    name: 'Shaorma de pui',
    description: 'Lipie proaspătă, piept de pui marinat, cartofi, salată, castraveți murați, sosuri preparate în casă.',
    price: 28,
    weight_grams: 450,
    image_url: '/images/shaorma-pui.jpg',
    badges: ['popular'],
    is_active: true,
    is_popular: true,
    ingredients: ['piept pui', 'lipie', 'cartofi', 'salată', 'castraveți murați'],
    order_index: 1,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-2',
    category_id: cat('shaorma-kebab').id,
    category: cat('shaorma-kebab'),
    name: 'Shaorma cu brânză',
    description: 'Piept de pui, brânză topită, cartofi, legume proaspete și sosuri preparate în casă.',
    price: 30,
    weight_grams: 470,
    image_url: '/images/shaorma%20cu%20branza.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: ['piept pui', 'brânză', 'lipie', 'cartofi'],
    order_index: 2,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-3',
    category_id: cat('shaorma-kebab').id,
    category: cat('shaorma-kebab'),
    name: 'Shaorma pui și vită',
    description: 'Combinație de piept pui și carne de vită, lipie caldă, cartofi, legume și sosuri.',
    price: 32,
    weight_grams: 480,
    image_url: '/images/shaorma%20pui%20si%20vita.jpg',
    badges: ['popular'],
    is_active: true,
    is_popular: true,
    ingredients: ['pui', 'vită', 'lipie', 'cartofi'],
    order_index: 3,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-4',
    category_id: cat('shaorma-kebab').id,
    category: cat('shaorma-kebab'),
    name: 'Shaorma mixtă',
    description: 'Pui, vită și berbecuț — lipie caldă, cartofi, salată, murături și sosuri preparate în casă.',
    price: 34,
    weight_grams: 500,
    image_url: '/images/shaorma-pui.jpg',
    badges: ['popular'],
    is_active: true,
    is_popular: true,
    ingredients: ['pui', 'vită', 'berbecuț', 'lipie', 'cartofi'],
    order_index: 4,
    created_at: NOW,
    updated_at: NOW,
  },

  // ── PREPARATE PUI ─────────────────────────────────────────
  {
    id: 'demo-5',
    category_id: cat('pui').id,
    category: cat('pui'),
    name: 'Pulpă pui dezosată',
    description: 'Pulpă de pui dezosată, marinată și gătită la grătar, servită cu garnitură la alegere.',
    price: 35,
    weight_grams: 350,
    image_url: '/images/Pulpa%20pui%20dezosata.jpg',
    badges: ['popular'],
    is_active: true,
    is_popular: true,
    ingredients: ['pulpă pui', 'condimente', 'marinadă'],
    order_index: 5,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-6',
    category_id: cat('pui').id,
    category: cat('pui'),
    name: 'Pui Shanghai',
    description: 'Bucăți de pui cu sos special Shanghai, cartofi prăjiți și salată.',
    price: 38,
    weight_grams: 400,
    image_url: '/images/pui%20shangai.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: ['pui', 'sos shanghai', 'cartofi'],
    order_index: 6,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-7',
    category_id: cat('pui').id,
    category: cat('pui'),
    name: 'Aripioare Crispy',
    description: 'Aripioare de pui crocante, marinate și prăjite, servite cu sos la alegere.',
    price: 32,
    weight_grams: 350,
    image_url: '/images/aripioare%20crispy.jpg',
    badges: ['nou'],
    is_active: true,
    is_popular: true,
    ingredients: ['aripioare pui', 'panare crocantă'],
    order_index: 7,
    created_at: NOW,
    updated_at: NOW,
  },

  // ── MENIURI ───────────────────────────────────────────────
  {
    id: 'demo-8',
    category_id: cat('meniuri').id,
    category: cat('meniuri'),
    name: 'Meniu piept pui',
    description: 'Piept de pui la grătar + garnitură la alegere + băutură 500ml.',
    price: 42,
    weight_grams: 0,
    image_url: '/images/meniu%20piept%20pui.jpg',
    badges: ['popular'],
    is_active: true,
    is_popular: true,
    ingredients: [],
    order_index: 8,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-9',
    category_id: cat('meniuri').id,
    category: cat('meniuri'),
    name: 'Meniu șnițel pui',
    description: 'Șnițel de pui pane + cartofi prăjiți + băutură 500ml.',
    price: 40,
    weight_grams: 0,
    image_url: '/images/meniu%20snitel%20pui5.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: [],
    order_index: 9,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-10',
    category_id: cat('meniuri').id,
    category: cat('meniuri'),
    name: 'Meniu mici',
    description: 'Porție mici la grătar + cartofi prăjiți + băutură 500ml.',
    price: 38,
    weight_grams: 0,
    image_url: '/images/meniu%20mici.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: [],
    order_index: 10,
    created_at: NOW,
    updated_at: NOW,
  },

  // ── GARNITURI ─────────────────────────────────────────────
  {
    id: 'demo-11',
    category_id: cat('garnituri').id,
    category: cat('garnituri'),
    name: 'Cartofi prăjiți',
    description: 'Porție generoasă de cartofi prăjiți, crocanți.',
    price: 12,
    weight_grams: 250,
    image_url: '/images/cartofi%20prajiti.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: ['cartofi'],
    order_index: 11,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-12',
    category_id: cat('garnituri').id,
    category: cat('garnituri'),
    name: 'Lapte cu orez',
    description: 'Preparat dulce tradițional, lapte cu orez și zahăr vanilat.',
    price: 14,
    weight_grams: 300,
    image_url: '/images/Lapte%20cu%20orez.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: ['lapte', 'orez', 'zahăr vanilat'],
    order_index: 12,
    created_at: NOW,
    updated_at: NOW,
  },

  // ── SOSURI ────────────────────────────────────────────────
  {
    id: 'demo-13',
    category_id: cat('sosuri').id,
    category: cat('sosuri'),
    name: 'Sos alb (usturoi)',
    description: 'Sos cremos de usturoi, preparat în casă după rețetă proprie.',
    price: 5,
    weight_grams: 50,
    image_url: '/images/vitrina%20si%20condimente.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: ['usturoi', 'maioneză', 'smântână'],
    order_index: 13,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-14',
    category_id: cat('sosuri').id,
    category: cat('sosuri'),
    name: 'Sos roșu (iute)',
    description: 'Sos picant din ardei, preparat în casă. Intensitate medie spre iute.',
    price: 5,
    weight_grams: 50,
    image_url: '/images/vitrina%20si%20condimente.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: ['ardei iute', 'roșii', 'condimente'],
    order_index: 14,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-15',
    category_id: cat('sosuri').id,
    category: cat('sosuri'),
    name: 'Sos tahini',
    description: 'Sos de susan, rețetă autentică orientală. Perfect cu shaorma de berbecuț.',
    price: 5,
    weight_grams: 50,
    image_url: '/images/vitrina%20si%20condimente.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: ['pastă susan', 'lămâie', 'usturoi'],
    order_index: 15,
    created_at: NOW,
    updated_at: NOW,
  },

  // ── BĂUTURI ───────────────────────────────────────────────
  {
    id: 'demo-16',
    category_id: cat('bauturi').id,
    category: cat('bauturi'),
    name: 'Pepsi',
    description: '500ml, rece.',
    price: 8,
    weight_grams: 0,
    image_url: '/images/Pepsi.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: [],
    order_index: 16,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-17',
    category_id: cat('bauturi').id,
    category: cat('bauturi'),
    name: '7UP Zero',
    description: '500ml, fără zahăr, rece.',
    price: 8,
    weight_grams: 0,
    image_url: '/images/7%20up%20zero.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: [],
    order_index: 17,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-18',
    category_id: cat('bauturi').id,
    category: cat('bauturi'),
    name: 'Mirinda',
    description: '500ml, portocale, rece.',
    price: 8,
    weight_grams: 0,
    image_url: '/images/Mirinda.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: [],
    order_index: 18,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-19',
    category_id: cat('bauturi').id,
    category: cat('bauturi'),
    name: 'Lipton Piersică',
    description: '500ml, rece.',
    price: 8,
    weight_grams: 0,
    image_url: '/images/Lipton%20piersica.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: [],
    order_index: 19,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-20',
    category_id: cat('bauturi').id,
    category: cat('bauturi'),
    name: 'Limonadă',
    description: '1L, preparată în casă, cu lămâie proaspătă.',
    price: 14,
    weight_grams: 0,
    image_url: '/images/Limonada%201%20l.jpg',
    badges: ['nou'],
    is_active: true,
    is_popular: true,
    ingredients: ['lămâie', 'zahăr', 'apă'],
    order_index: 20,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 'demo-21',
    category_id: cat('bauturi').id,
    category: cat('bauturi'),
    name: 'Limonadă mică',
    description: '500ml, preparată în casă, cu lămâie proaspătă.',
    price: 9,
    weight_grams: 0,
    image_url: '/images/limonada%20mica.jpg',
    badges: [],
    is_active: true,
    is_popular: false,
    ingredients: ['lămâie', 'zahăr', 'apă'],
    order_index: 21,
    created_at: NOW,
    updated_at: NOW,
  },
]

// ============================================================
// SETĂRI RESTAURANT
// ============================================================
export const demoSettings: RestaurantSettings = {
  id: 'demo-settings',
  name: RESTAURANT_NAME,
  phone: RESTAURANT_PHONE,
  whatsapp: WHATSAPP_NUMBER,
  address: RESTAURANT_ADDRESS,
  city: RESTAURANT_CITY,
  google_maps_url: GOOGLE_MAPS_URL,
  instagram_url: null,
  facebook_url: null,
  tiktok_url: null,
  schedule: [
    { day: 'luni', open: '10:00', close: '23:00', is_closed: false },
    { day: 'marti', open: '10:00', close: '23:00', is_closed: false },
    { day: 'miercuri', open: '10:00', close: '23:00', is_closed: false },
    { day: 'joi', open: '10:00', close: '23:00', is_closed: false },
    { day: 'vineri', open: '10:00', close: '23:00', is_closed: false },
    { day: 'sambata', open: '10:00', close: '23:00', is_closed: false },
    { day: 'duminica', open: '10:00', close: '23:00', is_closed: false },
  ],
  updated_at: NOW,
}

// ============================================================
// FUNCȚII UTILITARE
// ============================================================
export function filterDemoProductsByCategory(
  products: Product[],
  categorySlug?: string
): Product[] {
  if (!categorySlug || categorySlug === 'toate') return products
  const category = demoCategories.find(c => c.slug === categorySlug)
  if (!category) return products
  return products.filter(p => p.category_id === category.id)
}

export function countProductsByCategory(products: Product[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const p of products) {
    const slug = p.category?.slug
    if (slug) counts[slug] = (counts[slug] || 0) + 1
  }
  return counts
}

export const CATEGORY_EMOJI: Record<string, string> = {
  'shaorma-kebab': '🌯',
  pui: '🍗',
  meniuri: '🍱',
  garnituri: '🍟',
  sosuri: '🥫',
  bauturi: '🥤',
}
