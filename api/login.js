export default function handler(req, res) {
    const receivedName = req.body.name;
    const receivedPassword = req.body.password;
    const name = process.env.NAME;
    const password = process.env.PASSWORD;

    if (name === receivedName && password === receivedPassword) {
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