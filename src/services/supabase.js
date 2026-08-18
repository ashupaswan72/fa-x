import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/^"|"$/g, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.replace(/^"|"$/g, '');

// Check if credentials exist to prevent crashes before setup
export const supabaseError = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('YOUR_SUPABASE');

export const supabase = supabaseError 
  ? null 
  : createClient(supabaseUrl, supabaseAnonKey);
