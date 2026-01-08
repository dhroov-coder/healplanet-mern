import express from "express";
import sendEmail from "../utils/sendEmail.js";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

/* ============================
   TEST CLIENT EMAIL (RESEND)
   ============================ */
router.get("/test-client-mail", async (req, res) => {
  try {
    await sendEmail({
      to: "vermadhroov1@gmail.com", // ⚠️ REAL EMAIL ONLY
      subject: "Resend Client Mail Test",
      html: `
        <h2>Resend Test Successful ✅</h2>
        <p>If you received this email, client mail is working.</p>
      `,
    });

    res.send("CLIENT MAIL SENT SUCCESSFULLY");
  } catch (err) {
    console.error("Test mail error:", err);
    res.status(500).send("FAILED");
  }
});

/* ============================
   CONTACT / ENQUIRY ROUTE
   ============================ */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      country,
      quantity,
      message,
      product,
    } = req.body;

    /* 1️⃣ Save enquiry in DB */
    await Enquiry.create({
      name,
      email,
      company,
      country,
      quantity,
      message,
      product,
    });

    /* 2️⃣ Send response immediately */
    res.status(200).json({ success: true });

    /* 3️⃣ Admin Email */
    sendEmail({
      to: "info@healplanetinternational.org",
      subject: `New Enquiry for ${product || "Product"}`,
      text: `
New Enquiry Received:

Name: ${name}
Email: ${email}
Company: ${company}
Country: ${country}
Product: ${product}
Quantity: ${quantity}

Message:
${message}
      `,
    });

    /* 4️⃣ Client Thank You Email */
    sendEmail({
      to: email, // 👈 CLIENT EMAIL
      subject: `Thanks for contacting HealPlanet International`,
      html: `
        <h2>Hello ${name} </h2>
        <p>Thank you for reaching out to <b>HealPlanet International</b>.</p>

        <p>We have received your enquiry regarding <b>${product || "our products"}</b>.</p>
        <p>Our team will contact you shortly.</p>

        <br/>
        <p>
          Regards,<br/>
          <b>HealPlanet International</b><br/>
          Built for the Earth. Chosen by the World.
        </p>
      `,
    });

  } catch (err) {
    console.error("Contact route error:", err);
    res.status(500).json({ success: false });
  }
});

export default router;
