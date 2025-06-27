// Cloudflare Pages function for DecapCMS GitHub OAuth

// Handle CORS preflight
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
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
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: 'Ov23li6oBSkyyzPAM0zE',
        client_secret: clientSecret,
        code: code,
      }),
    });
    
    const data = await response.json();
    
    if (data.access_token) {
      // Return token in JSON format that DecapCMS expects
      return new Response(JSON.stringify({
        token: data.access_token,
        provider: 'github'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
      });
    } else {
      throw new Error('Failed to get access token');
    }
  } catch (error) {
    return new Response('Authentication failed: ' + error.message, {
      status: 500,
    });
  }
} 