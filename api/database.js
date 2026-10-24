import postgres from 'postgres';

// Maak verbinding met je database via de Transaction Pooler URL uit je environment variables
const sql = postgres(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // 1. BERICHTEN OPHALEN (GET)
  if (req.method === 'GET') {
    try {
      // Echte SQL-query om alle berichten op te halen, nieuwste bovenaan
      const berichten = await sql`
        SELECT id, name, message, created_at 
        FROM guestbook 
        ORDER BY created_at DESC;
      `;
      
      return res.status(200).json(berichten);
    } catch (error) {
      console.error('Fout bij ophalen:', error);
      return res.status(500).json({ error: 'Kon berichten niet ophalen' });
    }
  }

  // 2. NIEUW BERICHT OPSLAAN (POST)
  if (req.method === 'POST') {
    try {
      const { name, message } = req.body;

      // Snelle validatie
      if (!name || !message) {
        return res.status(400).json({ error: 'Naam en bericht zijn verplicht!' });
      }

      // Echte SQL-query om data toe te voegen (veilig tegen SQL-injectie door ${...})
      await sql`
        INSERT INTO gastenboek (name, message) 
        VALUES (${name}, ${message});
      `;

      return res.status(201).json({ success: true, message: 'Bericht geplaatst!' });
    } catch (error) {
      console.error('Fout bij opslaan:', error);
      return res.status(500).json({ error: 'Kon bericht niet opslaan' });
    }
  }

  // Als iemand een andere methode gebruikt (bijv. PUT of DELETE)
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}