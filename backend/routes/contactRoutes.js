import express from "express";
import sendEmail from "../utils/sendEmail.js";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

/* ===========================
   TEST CLIENT MAIL
=========================== */
router.get("/test-client-mail", async (req, res) => {
  try {
    await sendEmail({
      to: "unleasheddhroov1@gmail.com",
      subject: "CLIENT MAIL TEST",
      html: "<h1>Client mail working ✅</h1>",
    });

    res.send("CLIENT MAIL SENT SUCCESSFULLY");
  } catch (err) {
    console.error(err);
    res.status(500).send("FAILED");
  }
});

/* ===========================
   CONTACT FORM
=========================== */
router.post("/", async (req, res) => {
  try {
    const { name, email, company, country, quantity, message, product } = req.body;

    await Enquiry.create({
      name,
      email,
      company,
      country,
      quantity,
      message,
      product,
    });

    res.status(200).json({ success: true });

    // ADMIN MAIL
    sendEmail({
      to: "info@healplanetinternational.org",
      subject: `New Enquiry for ${product || "Product"}`,
      html: `
        <h3>New Enquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Country:</b> ${country}</p>
        <p><b>Quantity:</b> ${quantity}</p>
        <p><b>Product:</b> ${product}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    // CLIENT THANK YOU MAIL
    sendEmail({
      to: email,
      subject: "Thanks for contacting HealPlanet 🌱",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to <b>HealPlanet International</b>.</p>
        <p>We have received your enquiry and will contact you shortly.</p>
        <br/>
        <b>HealPlanet International</b><br/>
        Built for the Earth. Chosen by the World.
      `,
    });
  } catch (err) {
    console.error("Contact error:", err);
  }
});

export default router;
