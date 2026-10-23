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
    // Vang het bestand op uit de request
    const filename = request.query.filename || 'upload';
    
    const blob = await put(filename, request, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return response.status(200).json(blob);
  } catch (error) {
    console.error('Upload fout:', error);
    return response.status(500).json({ error: error.message });
  }
};