const { put } = require('@vercel/blob');

module.exports = async function handler(request, response) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filename = request.query.filename || 'upload';
    
    // We gebruiken nu de automatische OIDC token en de Store ID die je in je dashboard zag
    const blob = await put(filename, request, {
      access: 'public',
      // Vercel geeft automatisch de oidcToken mee via deze omgevingsvariabele
      oidcToken: process.env.VERCEL_OIDC_TOKEN,
      // Vul hier jouw Store ID in (die je op de screenshot zag bij .env.local)
      storeId: 'store_iL7g0UdUfKv1mYV', 
    });

    return response.status(200).json(blob);
  } catch (error) {
    console.error('Upload fout:', error);
    return response.status(500).json({ error: error.message });
  }
};