import { handleUpload } from '@vercel/blob/client';

export default async function handler(req, res) {
  try {
    const body = req.body;

    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        // Hier staan welke bestandsstypes mogen (zowel foto's als video's!)
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
    return res.status(400).json({ error: error.message });
  }
}