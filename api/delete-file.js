import { del } from '@vercel/blob';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    // 1. Check of de gebruiker is ingelogd via de cookie
    const cookieHeader = request.headers.cookie || "";
    const cookies = Object.fromEntries(
        cookieHeader.split('; ').map(cookie => {
            const [key, ...v] = cookie.split('=');
            return [key, v.join('=')];
        })
    );

    if (!cookies.auth_token || cookies.auth_token !== process.env.AUTH_TOKEN) {
        return res.status(401).json({ success: false, error: 'Niet geautoriseerd' });
    }

    try {
        // 2. Ontvang de URL van het bestand dat verwijderd moet worden uit de body
        const { url } = request.body;
        
        if (!url) {
            return response.status(400).json({ error: 'Geen URL meegeleverd' });
        }

        // 3. Verwijder het bestand uit Vercel Blob
        await del(url, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        return response.status(200).json({ success: true });

    } catch (error) {
        console.error('Fout bij verwijderen:', error);
        return response.status(500).json({ success: false, error: error.message });
    }
}