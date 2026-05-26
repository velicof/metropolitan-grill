-- ============================================================
-- SCHEMA SUPABASE — Shaormerie MVP
-- Rulează în ordine în SQL Editor din Supabase Dashboard
-- ============================================================

-- Extensii necesare
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABEL: categories
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  icon        TEXT NOT NULL DEFAULT '🍽️',
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABEL: products
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  price         NUMERIC(6,2) NOT NULL,
  weight_grams  INTEGER NOT NULL DEFAULT 0,
  image_url     TEXT,
  badges        TEXT[] DEFAULT '{}',   -- ex: {'popular','spicy'}
  is_active     BOOLEAN NOT NULL DEFAULT true,
  is_popular    BOOLEAN NOT NULL DEFAULT false,
  ingredients   TEXT[] DEFAULT '{}',
  order_index   INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABEL: settings (un singur rând)
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name            TEXT NOT NULL DEFAULT 'Shaormeria Noastră',
  phone           TEXT NOT NULL DEFAULT '0700000000',
  whatsapp        TEXT NOT NULL DEFAULT '40700000000',
  address         TEXT NOT NULL DEFAULT 'Strada Exemplu nr. 1',
  city            TEXT NOT NULL DEFAULT 'București',
  google_maps_url TEXT NOT NULL DEFAULT 'https://maps.google.com',
  instagram_url   TEXT,
  facebook_url    TEXT,
  tiktok_url      TEXT,
  schedule        JSONB NOT NULL DEFAULT '[
    {"day":"luni","open":"10:00","close":"23:00","is_closed":false},
    {"day":"marti","open":"10:00","close":"23:00","is_closed":false},
    {"day":"miercuri","open":"10:00","close":"23:00","is_closed":false},
    {"day":"joi","open":"10:00","close":"23:00","is_closed":false},
    {"day":"vineri","open":"10:00","close":"00:00","is_closed":false},
    {"day":"sambata","open":"10:00","close":"01:00","is_closed":false},
    {"day":"duminica","open":"12:00","close":"22:00","is_closed":false}
  ]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Activare RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings    ENABLE ROW LEVEL SECURITY;

-- Oricine poate citi categoriile și produsele active (site public)
CREATE POLICY "Public read categories"
  ON categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public read settings"
  ON settings FOR SELECT
  USING (true);

-- Doar admin (utilizator autentificat) poate face CRUD
CREATE POLICY "Admin full access categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update settings"
  ON settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET pentru imagini
-- ============================================================
-- Rulează asta DUPĂ ce creezi bucket-ul "images" în Supabase Storage

-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- CREATE POLICY "Public read images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'images');

-- CREATE POLICY "Admin upload images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- CREATE POLICY "Admin delete images"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA — Date demo pentru development
-- ============================================================

-- Categorii
INSERT INTO categories (name, slug, icon, order_index) VALUES
  ('Shaorma',   'shaorma',  '🌯', 1),
  ('Kebab',     'kebab',    '🥙', 2),
  ('Farfurii',  'farfurii', '🍽️', 3),
  ('Burgeri',   'burgeri',  '🍔', 4),
  ('Meniuri',   'meniuri',  '🎁', 5),
  ('Băuturi',   'bauturi',  '🥤', 6),
  ('Sosuri',    'sosuri',   '🫙', 7),
  ('Extra',     'extra',    '➕', 8)
ON CONFLICT (slug) DO NOTHING;

-- Produse demo (înlocuiești cu produse reale)
INSERT INTO products (category_id, name, description, price, weight_grams, image_url, badges, is_popular, ingredients, order_index)
SELECT
  c.id,
  p.name,
  p.description,
  p.price,
  p.weight_grams,
  p.image_url,
  p.badges::TEXT[],
  p.is_popular,
  p.ingredients::TEXT[],
  p.order_index
FROM (VALUES
  ('shaorma', 'Shaorma Clasică Pui',     'Pui marinat la grătar, salată proaspătă, roșii, castraveți, ceapă, sos alb', 22.00, 380, NULL, '{"popular"}', true, '{"pui marinat","salată","roșii","castraveți","ceapă","sos alb","lipie"}', 1),
  ('shaorma', 'Shaorma Vită',            'Vită premium la grătar, mix salate, roșii, sos de iaurt cu usturoi',           28.00, 420, NULL, '{"popular","spicy"}', true, '{"vită","mix salate","roșii","sos usturoi","lipie"}', 2),
  ('shaorma', 'Shaorma Mixta',           'Mix pui și vită, dublă porție de sos, legume proaspete',                       30.00, 450, NULL, '{"popular"}', false, '{"pui","vită","salată","roșii","ceapă","sos mixt","lipie"}', 3),
  ('shaorma', 'Shaorma Vegetariană',     'Falafel crocant, hummus, mix legume grillate, sos tahini',                     20.00, 350, NULL, '{"vegetarian"}', false, '{"falafel","hummus","legume grillate","sos tahini","lipie integrală"}', 4),
  ('kebab',   'Kebab Adana',             'Kebab picant de vită, ardei grillat, ceapă roșie, sos iute',                   26.00, 380, NULL, '{"spicy"}', false, '{"vită","ardei grill","ceapă roșie","sos iute","pita"}', 1),
  ('kebab',   'Kebab Clasic',            'Kebab de vită cu sos de iaurt, salată, roșii, ceapă',                          24.00, 360, NULL, '{}', false, '{"vită","sos iaurt","salată","roșii","pita"}', 2),
  ('farfurii','Farfurie Shaorma Pui',    'Shaorma la farfurie cu cartofi prăjiți și salată de varză',                    32.00, 550, NULL, '{"popular"}', true, '{"pui marinat","cartofi","salată varză","sos alb"}', 1),
  ('farfurii','Farfurie Mixta Grătar',   'Mix de carne la grătar, cartofi, mujdei, salată',                              42.00, 650, NULL, '{}', false, '{"pui","vită","cartofi","mujdei","salată"}', 2),
  ('burgeri', 'Burger Shaorma',          'Burger cu carne de pui la grătar, salate, sos special shaormerie',             28.00, 400, NULL, '{"nou"}', false, '{"pui","salată","roșii","sos shaormerie","chifla"}', 1),
  ('meniuri', 'Meniu Shaorma + Băutură', 'Shaorma clasică + băutură la alegere (0.5L)',                                  28.00, 0,   NULL, '{"oferta"}', true, '{}', 1),
  ('bauturi', 'Cola 0.5L',              'Coca-Cola rece',                                                               8.00, 500,  NULL, '{}', false, '{}', 1),
  ('bauturi', 'Apă Plată 0.5L',         'Apă minerală plată',                                                           5.00, 500,  NULL, '{}', false, '{}', 2),
  ('bauturi', 'Suc Natural Portocale',   'Portocale proaspăt stoarse, 400ml',                                            12.00, 400, NULL, '{"nou"}', false, '{}', 3),
  ('sosuri',  'Sos Alb',                'Sos de iaurt cu usturoi și ierburi',                                            3.00, 60,  NULL, '{"popular"}', false, '{}', 1),
  ('sosuri',  'Sos Iute',               'Sos chili, ardei iute, roșii',                                                  3.00, 60,  NULL, '{"spicy"}', false, '{}', 2),
  ('extra',   'Cartofi Prăjiți',         'Porție de cartofi crocanți',                                                   12.00, 250, NULL, '{}', false, '{}', 1)
) AS p(cat_slug, name, description, price, weight_grams, image_url, badges, is_popular, ingredients, order_index)
JOIN categories c ON c.slug = p.cat_slug
ON CONFLICT DO NOTHING;

-- Setări restaurant (un singur rând)
INSERT INTO settings (name, phone, whatsapp, address, city, google_maps_url)
VALUES (
  'Shaormeria Noastră',
  '0712 345 678',
  '40712345678',
  'Strada Exemplu nr. 1, Sector 2',
  'București',
  'https://maps.google.com/?q=Shaormeria+Noastra+Bucuresti'
) ON CONFLICT DO NOTHING;
