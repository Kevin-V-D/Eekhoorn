export default function handler(req, res) {
    const receivedName = req.body.name;
    const receivedPassword = req.body.password;
    const name = process.env.NAME;
    const password = process.env.PASSWORD;

    if (name === receivedName && password === receivedPassword) {
        const token = process.env.AUTH_TOKEN;

        res.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; secure; SameSite=Strict; path=/; Max-age=3600`);

        return res.status(200).json({
            success: true
        });
    } else {
        return res.status(401).json({
            success: false,
            bericht: "Naam of wachtwoord incorrect."
        });
    }
}