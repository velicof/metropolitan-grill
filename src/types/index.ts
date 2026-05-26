// ============================================================
// TIPURI PRINCIPALE — Shaormerie MVP
// Modifică aceste tipuri dacă adaugi câmpuri noi în Supabase
// ============================================================

export type Badge = 'popular' | 'spicy' | 'vegetarian' | 'nou' | 'oferta'

export interface Category {
  id: string
  name: string
  slug: string
  icon: string        // emoji sau nume icon
  order_index: number
  is_active: boolean
  created_at: string
}

export interface Product {
  id: string
  category_id: string
  category?: Category
  name: string
  description: string
  price: number           // în RON (ex: 25.00)
  weight_grams: number    // gramaj (ex: 350)
  image_url: string | null
  badges: Badge[]         // ['popular', 'spicy']
  is_active: boolean
  is_popular: boolean
  ingredients: string[]   // lista ingrediente
  order_index: number
  created_at: string
  updated_at: string
}

// Folosit în coș
export interface CartItem {
  product: Product
  quantity: number
}

// Informații comandă WhatsApp
export interface OrderForm {
  name: string
  phone: string
  type: 'ridicare' | 'livrare'
  address: string         // gol dacă e ridicare
  notes: string           // mențiuni speciale
}

// Structura pentru page de produs — cu produse similare
export interface ProductPageData {
  product: Product
  similar: Product[]
}

// Setări restaurant — configurabile din admin
export interface RestaurantSettings {
  id: string
  name: string
  phone: string
  whatsapp: string        // număr fără +, ex: 40779299788
  address: string
  city: string
  google_maps_url: string
  instagram_url: string | null
  facebook_url: string | null
  tiktok_url: string | null
  schedule: ScheduleDay[]
  updated_at: string
}

export interface ScheduleDay {
  day: 'luni' | 'marti' | 'miercuri' | 'joi' | 'vineri' | 'sambata' | 'duminica'
  open: string   // ex: '10:00'
  close: string  // ex: '23:00'
  is_closed: boolean
}

// Tipuri pentru Supabase Database (generalizat)
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at'>
        Update: Partial<Omit<Category, 'id' | 'created_at'>>
        Relationships: []
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category'>
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category'>>
        Relationships: []
      }
      settings: {
        Row: RestaurantSettings
        Insert: Omit<RestaurantSettings, 'id' | 'updated_at'>
        Update: Partial<Omit<RestaurantSettings, 'id' | 'updated_at'>>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
