export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["shreyaskatta14@gmail.com"],
        reply_to: email,
        subject: `Portfolio Contact: ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error:", data);

      return res.status(500).json({
        error: "Failed to send message.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
}