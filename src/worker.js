const REDIRECTS = {
  '/about-us': '/about',
  '/contact': '/contact-us',
  '/privacy': '/privacy-policy',
  '/terms': '/terms-and-conditions',
  '/daily-typing-challenge': '/daily-challenge',
  '/learn-typing': '/learn',
  '/typing-race': '/race',
  '/typing-games': '/games',
  '/cookies': '/cookie-policy',
  '/cookie': '/cookie-policy',
  '/mpsc-typing-practice': '/government-exam-typing-practice'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cleanPath = url.pathname.toLowerCase().replace(/\/+$/, '');

    // Pure HTTP 301 Redirects for legacy routes
    if (REDIRECTS[cleanPath]) {
      return Response.redirect(new URL(REDIRECTS[cleanPath], request.url), 301);
    }

    // Exact handling for ads.txt (Google AdSense crawler verification)
    if (cleanPath === '/ads.txt') {
      const headers = {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=3600',
        'access-control-allow-origin': '*',
        'x-content-type-options': 'nosniff'
      };

      if (request.method === 'HEAD') {
        return new Response(null, { status: 200, headers });
      }

      return new Response('google.com, pub-5060556948017928, DIRECT, f08c47fec0942fa0\n', {
        status: 200,
        headers
      });
    }

    // Serve static assets from Cloudflare KV/Assets binding
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response('TypeBaazi is running on Cloudflare Workers!', {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
