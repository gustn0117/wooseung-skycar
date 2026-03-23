import { NextResponse } from 'next/server';
import { supabase, proxyImageUrls } from '@/lib/supabase';

export const revalidate = 0;

export async function GET() {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('published', true)
    .order('work_date', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(proxyImageUrls(data ?? []));
}
