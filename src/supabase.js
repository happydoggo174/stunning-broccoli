import { GoTrueClient } from '@supabase/auth-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = new GoTrueClient({
    url:supabaseUrl,
    headers:{ apikey:supabaseAnonKey},
    storageKey:'supabase-auth'
},);