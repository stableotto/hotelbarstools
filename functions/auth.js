// Cloudflare Pages function for DecapCMS GitHub OAuth
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
      // Return success page with token for DecapCMS
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authorization Successful</title>
        </head>
        <body>
          <h1>Authorization Successful</h1>
          <p>Redirecting back to CMS...</p>
          <script>
            // DecapCMS expects this specific format
            if (window.opener) {
              window.opener.postMessage('authorization:github:success:{"token":"${data.access_token}","provider":"github"}', window.location.origin);
              window.close();
            } else {
              // Fallback: redirect to admin with token
              window.location.href = '/admin/#/access_token=${data.access_token}&token_type=bearer&provider=github';
            }
          </script>
        </body>
        </html>
      `;
      
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
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