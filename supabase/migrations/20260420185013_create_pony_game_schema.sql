/*
  # Pony Princess Dress-Up Game Schema

  ## Summary
  Creates the database schema for a princess pony dress-up game with paywall monetization.

  ## New Tables

  ### `game_items`
  - All customization items (outfits, accessories, hair, colors, backgrounds)
  - Each item has a category, name, image reference, unlock tier (free/premium)
  - Includes display order and pricing metadata

  ### `user_progress`
  - Tracks which items a user has unlocked
  - Stores current character configuration (selected items)
  - Links to Supabase auth.users

  ### `purchases`
  - Records all in-app purchase transactions
  - Supports one-time purchases and bundle unlocks
  - Tracks purchase status and amount

  ## Security
  - RLS enabled on all tables
  - Users can only read/write their own progress and purchases
  - game_items is publicly readable (catalog)
*/

-- Game items catalog
CREATE TABLE IF NOT EXISTS game_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('body_color', 'mane_style', 'mane_color', 'tail_style', 'outfit', 'accessory', 'background', 'horn', 'wings')),
  name text NOT NULL,
  image_key text NOT NULL,
  is_premium boolean DEFAULT false,
  price_usd numeric(6,2) DEFAULT 0,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- User game progress
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_config jsonb DEFAULT '{}',
  unlocked_items uuid[] DEFAULT '{}',
  coins integer DEFAULT 100,
  has_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Purchase history
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  amount_usd numeric(6,2) NOT NULL,
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'refunded')),
  purchased_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- game_items: publicly readable
CREATE POLICY "Anyone can view game items"
  ON game_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- user_progress policies
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- purchases policies
CREATE POLICY "Users can view own purchases"
  ON purchases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases"
  ON purchases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_game_items_category ON game_items(category);
