import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      game_items: {
        Row: {
          id: string
          category: string
          name: string
          image_key: string
          is_premium: boolean
          price_usd: number
          sort_order: number
          created_at: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          current_config: Record<string, string>
          unlocked_items: string[]
          coins: number
          has_premium: boolean
          created_at: string
          updated_at: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          product_id: string
          product_name: string
          amount_usd: number
          status: string
          purchased_at: string
        }
      }
    }
  }
}
