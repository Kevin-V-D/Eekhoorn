export default function handler(req, res) {
    const cookieHeader = req.headers.cookie || "";
    const hasAccess = cookieHeader.includes("auth_token=testtoken");

    if (!hasAccess) {
        return res.status(401).json({
            success: false,
            bericht: "Niet geautoriseerd. Log eerst in."
        });
    }

    return res.status(200).json({
        success: true,
        bericht: "Je bent ingelogd en hebt toegang!"
    });
}