import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html, text }) => {
  return await resend.emails.send({
    from: "HealPlanet <info@healplanetinternational.org>", // verified sender
    to,
    subject,
    html,
    text,
  });
};

export default sendEmail;
