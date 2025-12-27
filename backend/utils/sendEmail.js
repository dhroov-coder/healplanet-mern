import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,          // 🔥 CHANGE
    secure: false,      // 🔥 IMPORTANT
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD, // Gmail App Password
    },
  });

  await transporter.sendMail({
    from: `"HealPlanet" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject,
    text,
  });
};

export default sendEmail;
