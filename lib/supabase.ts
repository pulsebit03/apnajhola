import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback to a valid format URL if not configured to prevent crash during build/dev
const urlToUse = (supabaseUrl && supabaseUrl.startsWith('http')) ? supabaseUrl : 'https://placeholder.supabase.co';
const keyToUse = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(urlToUse, keyToUse);
