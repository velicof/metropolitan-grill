import { createClient } from '@supabase/supabase-js'

// ============================================================
// Client Supabase — folosit în Server Components și API routes
// Variabilele de mediu se setează în .env.local
// ============================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Lipsesc variabilele de mediu Supabase. Verifică .env.local')
}

// Client public (pentru date publice — meniu, categorii)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client cu service role — DOAR în server actions / API routes
// Nu expune SUPABASE_SERVICE_KEY în client!
export const createAdminClient = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
