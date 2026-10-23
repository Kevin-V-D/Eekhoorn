import { handleUpload } from '@vercel/blob';

export default async function handler(req, res) {
  // Zorg dat het alleen een POST request is
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Soms komt de body binnen als string, vangen we dat hier netjes op
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // Als het geen JSON is, laten we het voor wat het is
      }
    }

    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            'image/jpeg', 
            'image/png', 
            'image/webp', 
            'image/gif', 
            'video/mp4', 
            'video/quicktime'
          ],
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload voltooid:', blob.url);
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    // Dit vangt de echte fout op en stuurt hem mee in de response zodat we het in de console zien
    console.error('Server error in upload-token:', error);
    return res.status(500).json({ error: error.message || 'Onbekende server fout' });
  }
}