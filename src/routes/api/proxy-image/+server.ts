import type { RequestHandler } from "@sveltejs/kit";
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
  const imageUrl = url.searchParams.get('url');
    //  console.log(imageUrl)
  if (!imageUrl) {
    throw error(400, 'Missing url parameter');
  }

  // Basic safety check: only allow mangadex-related hosts through
  const allowedHostPattern = /(mangadex\.org|mangadex\.network)$/;
  let parsed;
  try {
    parsed = new URL(imageUrl);
  } catch {
    throw error(400, 'Invalid url');
  }
  if (!allowedHostPattern.test(parsed.hostname)) {
    throw error(403, 'Host not allowed');
  }

  const mdResponse = await fetch(imageUrl, {
    headers: {
      'Referer': 'https://mangadex.org/',
      'User-Agent': 'Mozilla/5.0 (compatible; Mangase/1.0)'
    }
  });

  if (!mdResponse.ok || !mdResponse.body) {
    throw error(mdResponse.status, 'Failed to fetch image');
  }

  return new Response(mdResponse.body, {
    status: 200,
    headers: {
      'Content-Type': mdResponse.headers.get('content-type') ?? 'image/jpeg',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
