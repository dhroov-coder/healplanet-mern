import { useState } from "react";
import "./FAQ.css";

export default function FAQ() {
  const faqs = [
    {
      question: "What materials are used in HealPlanet products?",
      answer:
        "Our products are made from eco-friendly materials such as bagasse, bamboo fibers, and recycled paper.",
    },
    {
      question: "Are your products biodegradable?",
      answer:
        "Yes! All HealPlanet products are biodegradable and fully compostable, ensuring minimal environmental impact.",
    },
    {
      question: "Do you offer bulk purchasing?",
      answer:
        "Yes, we provide bulk supply for hotels, restaurants, distributors, and corporate needs.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 3-7 business days depending on your location.",
    },
    {
      question: "Can I request product samples?",
      answer:
        "Absolutely! Contact us through our enquiry form, and we will arrange samples for you.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <p className="faq-sub">
        Find answers to the most common questions about our eco-friendly
        products.
      </p>

      <div className="faq-list">
        {faqs.map((item, i) => (
          <div className="faq-item" key={i}>
            <div className="faq-question" onClick={() => toggleFAQ(i)}>
              <span>{item.question}</span>
              <span className={`arrow ${openIndex === i ? "open" : ""}`}>
                ▼
              </span>
            </div>

            <div className={`faq-answer ${openIndex === i ? "show" : ""}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
