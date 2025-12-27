import { useState } from "react";
import axios from "axios";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    quantity: "",
    product: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields!");
      return;
    }

    await axios.post("http://localhost:5000/api/contact", form);
    alert("Enquiry sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
      quantity: "",
      product: "",
    });
  };

  return (
    <div className="contact-wrapper">

      {/* LEFT SECTION */}
      <div className="contact-left">
        <h1>Contact Us</h1>
        <p className="subtext">
          We are here to help with bulk orders, product information, and business partnerships.
        </p>

        <div className="contact-info-box">
          <div className="info-item">
            <span className="icon">📍</span>
            <p>Karnal, Haryana, India</p>
          </div>

          <div className="info-item">
            <span className="icon">📞</span>
            <p>+91 90344 19744</p>
          </div>

          <div className="info-item">
            <span className="icon">✉️</span>
            <p>info@healplanetinternational.org</p>
          </div>

          <div className="info-item">
            <span className="icon">⏰</span>
            <p>Mon–Sat: 9:00 AM – 6:00 PM</p>
          </div>
        </div>

         {/* SOCIAL LINKS */}
<div className="contact-socials">
  <a
    href="https://www.facebook.com/people/HealPlanet-International/61584656919342/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <i className="fab fa-facebook-f"></i>
  </a>

  <a
    href="https://www.linkedin.com/company/109970307"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <i className="fab fa-linkedin-in"></i>
  </a>

  <a
    href="https://www.instagram.com/healplanetinternational/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <i className="fab fa-instagram"></i>
  </a>
</div>

      </div>

     
      {/* RIGHT SECTION (FORM) */}
      <div className="contact-right">
        <h2>Send Us Your Enquiry</h2>

        <form onSubmit={handleSubmit} className="contact-form">

          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="product"
            placeholder="Product Name (Optional)"
            value={form.product}
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity (Optional)"
            value={form.quantity}
            onChange={handleChange}
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Write your message *"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="submit-btn">
            Send Enquiry →
          </button>
        </form>
      </div>


    </div>
  );
}
