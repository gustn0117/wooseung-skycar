import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'wooseung_skycar' },
});

// Admin client with service_role key (server-side only)
export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceKey, {
    db: { schema: 'wooseung_skycar' },
  });
}

// Convert Supabase storage URLs to local proxy URLs
// e.g. https://api.hsweb.pics/storage/v1/object/public/bucket/file.jpg → /api/storage/bucket/file.jpg
export function proxyImageUrls<T extends { image_urls?: string[] }>(items: T[]): T[] {
  const storagePrefix = `${supabaseUrl}/storage/v1/object/public/`;
  return items.map(item => ({
    ...item,
    image_urls: item.image_urls?.map(url =>
      url.startsWith(storagePrefix)
        ? `/api/storage/${url.slice(storagePrefix.length)}`
        : url
    ),
  }));
}
