const { handleUpload } = require('@vercel/blob/client');

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
    const body = request.body;

    // Vercel's handleUpload regelt de beveiligde token-uitgifte aan je frontend
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            'image/jpeg', 
            'image/png', 
            'image/webp', 
            'application/pdf', 
            'text/plain', 
            'video/mp4', 
            'video/webm'
          ],
          token: process.env.BLOB_READ_WRITE_TOKEN,
        };
      },
      onUploadCompleted: async ({ blob, token }) => {
        console.log('Blob upload compleet:', blob.url);
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Handle upload fout:', error);
    return response.status(400).json({ error: error.message });
  }
};