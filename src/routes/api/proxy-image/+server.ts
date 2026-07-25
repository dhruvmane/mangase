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
    referrer: 'https://mangadex.org',
    referrerPolicy: 'strict-origin-when-cross-origin'
  });

  if (!mdResponse.ok || !mdResponse.body) {
    throw error(mdResponse.status, 'Failed to fetch image');
  }

  console.log('status:', mdResponse.status);
  console.log('content-length:', mdResponse.headers.get('content-length'));
  console.log('cf-cache-status:', mdResponse.headers.get('cf-cache-status'));

  return new Response(mdResponse.body, {
    status: 200,
    headers: {
      'Content-Type': mdResponse.headers.get('content-type') ?? 'image/jpeg',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
