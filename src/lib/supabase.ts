import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'customer' | 'trade'

export interface UserProfile {
  id: string
  user_id: string
  email: string
  first_name: string
  last_name: string
  role: UserRole
  phone?: string
  address_line_1?: string
  address_line_2?: string
  city?: string
  county?: string
  postcode?: string
  business_name?: string
  business_type?: string
  years_experience?: string
  trade_specialty?: string
  has_insurance?: boolean
  has_license?: boolean
  agreed_to_terms?: boolean
  profile_description?: string
  leads?: number[]
  credit?: number
  created_at: string
  updated_at: string
}