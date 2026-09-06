export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve static assets from Cloudflare KV/Assets binding
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response('TypeBaazi is running on Cloudflare Workers!', {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
