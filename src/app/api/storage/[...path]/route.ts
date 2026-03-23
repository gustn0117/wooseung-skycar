import { NextRequest, NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import path from 'path';

// Storage volume is mounted at /storage/<bucket>/<filename>/<uuid>
// In development, fall back to Supabase SDK download
const STORAGE_ROOT = '/storage';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const segments = (await params).path;
  // segments = ["bucket-name", "filename.jpg"]
  if (segments.length < 2) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const bucket = segments[0];
  const fileName = segments.slice(1).join('/');

  // Supabase storage stores files as: <bucket>/<filename>/<uuid>
  const dirPath = path.join(STORAGE_ROOT, bucket, fileName);

  try {
    const entries = await readdir(dirPath);
    if (entries.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const filePath = path.join(dirPath, entries[0]);
    const buffer = await readFile(filePath);

    const ext = fileName.split('.').pop()?.toLowerCase();
    const contentType =
      ext === 'png' ? 'image/png' :
      ext === 'webp' ? 'image/webp' :
      ext === 'gif' ? 'image/gif' :
      'image/jpeg';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
