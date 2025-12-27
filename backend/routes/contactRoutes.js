import express from "express";
import sendEmail from "../utils/sendEmail.js";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, company, country, quantity, message, product } = req.body;

    // 1️⃣ Save enquiry FIRST
    const enq = await Enquiry.create({
      name,
      email,
      company,
      country,
      quantity,
      message,
      product
    });

    // 2️⃣ SEND RESPONSE IMMEDIATELY 🚀
    res.status(200).json({ success: true });

    // 3️⃣ SEND EMAILS IN BACKGROUND (no await)
    sendEmail({
      email: "info@healplanetinternational.org",
      subject: `New Quote Request for ${product || "a product"}`,
      text: `New Quote Request:

Product: ${product || "N/A"}
Name: ${name}
Email: ${email}
Company: ${company}
Country: ${country}
Order Quantity: ${quantity}

Message:
${message}`
    });

    sendEmail({
      email,
      subject: `Thanks for your enquiry about ${product || "our products"}`,
      text: `Hello ${name},

Thanks for contacting HealPlanet International.
We have received your enquiry and our team will contact you shortly.

Regards,
HealPlanet International`
    });

  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ success: false });
  }
});

export default router;
