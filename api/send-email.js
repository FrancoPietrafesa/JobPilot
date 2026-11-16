export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "RESEND_API_KEY no está configurada en las variables de entorno de Vercel."
    });
  }

  const { to, subject, message, pdfBase64, filename } = req.body || {};

  if (!to || !subject || !message || !pdfBase64) {
    return res.status(400).json({
      error: "Faltan campos obligatorios (to, subject, message, pdfBase64)."
    });
  }

  const fromEmail = process.env.SENDER_EMAIL || "Franco Pietrafesa <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        text: message,
        attachments: [
          {
            filename: filename || "CV-Franco-Pietrafesa.pdf",
            content: pdfBase64
          }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.message || "Error al enviar el correo con Resend."
      });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Error interno enviando el correo."
    });
  }
}
