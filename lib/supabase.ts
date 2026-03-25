<<<<<<< HEAD
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// 아까 .env.local에 적은 비밀 주소들을 불러옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 이제 이 'supabase'라는 변수를 다른 파일에서 불러와서 DB를 읽고 쓸 수 있습니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
=======
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing')
}

if (!supabaseKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
>>>>>>> 564ee98 (Initial commit)
