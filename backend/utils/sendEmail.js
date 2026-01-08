import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: `HealPlanet International <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", data);
    return data;
  } catch (error) {
    console.error("Email failed:", error);
    throw error;
  }
};

export default sendEmail;
