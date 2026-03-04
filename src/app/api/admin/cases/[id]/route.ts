import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

function isAuthed(cookieStore: ReturnType<typeof cookies> extends Promise<infer T> ? T : never) {
  return cookieStore.get('admin_token')?.value === process.env.ADMIN_PASSWORD;
}

// PUT: update a case
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from('cases')
    .update({
      title: body.title,
      description: body.description,
      location: body.location,
      work_date: body.work_date || null,
      image_urls: body.image_urls || [],
      published: body.published ?? true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE: delete a case
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getServiceClient();

  const { error } = await supabase.from('cases').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
