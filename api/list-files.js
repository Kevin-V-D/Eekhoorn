const { list } = require('@vercel/blob');

module.exports = async function handler(request, response) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    // Vraag alle bestanden op met je beveiligde token
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return response.status(200).json(blobs);
  } catch (error) {
    console.error('Fout bij ophalen lijst:', error);
    return response.status(500).json({ error: error.message });
  }
};