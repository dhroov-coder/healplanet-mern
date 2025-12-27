import "./Certifications.css";
import { useState } from "react";

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  const items = [
    {
      title: "Certificate of Compostability",
      desc: "Quality management that meets international safety standards.",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424946/Certificate-1_dfzqp1.png",
    },
    {
      title: "Certificate of Responsible Material",
      desc: "Certified sustainable and biodegradable material usage.",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424945/Certificate-3_vbuk4a.png",
    },
    {
      title: "Certificate of Environmental Management Practices ",
      desc: "Packaging & materials comply with global recycling norms.",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424942/Certificate-4_jruiij.png",
    },
    {
      title: "Certificate of Food Safety Compliance",
      desc: "Ensures hygienic and safe consumer product standards.",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424943/Certificate-2_ivibk8.png",
    },
  ];

  return (
    <div className="cert-page">
      <h1 className="cert-main-title">Our Certifications</h1>

      <p className="cert-subtext">
        HealPlanet is committed to delivering high-quality, eco-friendly
        products that meet global safety and sustainability standards.
        At HealPlanet International, compliance and product integrity are core priorities. Our operations and supply partners follow structured quality systems, food-contact safety norms, and responsible sourcing practices to meet international buyer expectations.
        <br />
        Detailed certificates, declarations, and test reports are shared directly with buyers during inquiry and onboarding stages.
      </p>

      <div className="cert-container">
        {items.map((c, i) => (
          <div key={i} className="cert-box">
            <img
              src={c.image}
              className="cert-img"
              alt={c.title}
              onClick={() => setActiveCert(c.image)}
              style={{ cursor: "pointer" }}
            />

            <h2 className="cert-title">{c.title}</h2>

            <p className="cert-desc">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* ================= CERT MODAL ================= */}
{activeCert && (
  <div className="cert-modal" onClick={() => setActiveCert(null)}>
    <div
      className="cert-modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="cert-close"
        onClick={() => setActiveCert(null)}
      >
        ×
      </button>

      <img src={activeCert} alt="Certificate Full View" />
    </div>
  </div>
)}

    </div>
  );
  

}
