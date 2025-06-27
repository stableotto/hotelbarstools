// Cloudflare Pages function for DecapCMS GitHub OAuth
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
    });
  }
  
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  const code = url.searchParams.get('code');
  
  if (!code) {
    // Redirect to GitHub OAuth
    const clientId = 'Ov23li6oBSkyyzPAM0zE';
    const redirectUri = `${url.origin}/auth`;
    const scope = 'repo,user';
    
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    return Response.redirect(githubUrl, 302);
  }
  
  // Exchange code for token
  const clientSecret = '96ad98e9c1a684f54c2df0c209a3e4ee0aabe076';
  
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'DecapCMS-OAuth'
      },
      body: JSON.stringify({
        client_id: 'Ov23li6oBSkyyzPAM0zE',
        client_secret: clientSecret,
        code: code,
      }),
    });
    
    if (!tokenResponse.ok) {
      throw new Error(`GitHub API error: ${tokenResponse.status}`);
    }
    
    const data = await tokenResponse.json();
    
    if (!data.access_token) {
      throw new Error('No access token received from GitHub');
    }
    
    // Create the callback URL with token and provider
    const adminCallbackUrl = `${url.origin}/admin/#access_token=${data.access_token}&token_type=bearer&provider=github`;
    
    // Redirect back to DecapCMS admin interface with token
    return Response.redirect(adminCallbackUrl, 302);
    
  } catch (error) {
    console.error('OAuth error:', error);
    
    // Redirect to admin with error
    const errorUrl = `${url.origin}/admin/?error=oauth_error&error_description=${encodeURIComponent(error.message)}`;
    return Response.redirect(errorUrl, 302);
  }
} 