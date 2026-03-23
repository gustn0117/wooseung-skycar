import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient, proxyImageUrls } from '@/lib/supabase';
import { cookies } from 'next/headers';

function isAuthed(cookieStore: ReturnType<typeof cookies> extends Promise<infer T> ? T : never) {
  return cookieStore.get('admin_token')?.value === process.env.ADMIN_PASSWORD;
}

// GET: list all cases (admin sees all, including unpublished)
export async function GET() {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(proxyImageUrls(data ?? []));
}

// POST: create a new case
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from('cases')
    .insert({
      title: body.title,
      description: body.description,
      location: body.location,
      work_date: body.work_date || null,
      image_urls: body.image_urls || [],
      published: body.published ?? true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
