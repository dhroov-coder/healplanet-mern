import { Link } from "react-router-dom";
import {useState } from "react";

export default function Home() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <div className="home-wrapper">

      {/* ================= HERO ================= */}
      <section className="hero-full">
        <img
          src="Home/homepagecover.png"
          alt="Eco Products"
          className="hero-bg"
        />
        <div className="hero-overlay"></div>

        <div className="hero-overlay-content">
          <h1>HealPlanet International</h1>
          <p>
            Everyday essentials that are easy on the go <br />
            and gentle on the planet.
          </p>

          <Link to="/categories">
            <button className="btn-primary hero-btn">
              Explore Products
            </button>
          </Link>
        </div>
      </section>

      {/* ================= MOVING STRIP ================= */}
      <section className="marquee-section">
        <div className="marquee">
          <span>
            Everyday Essentials That Are Easy On The Go And The Planet •
            Sustainable • Compostable • Export Ready •
          </span>
          <span>
            Everyday Essentials That Are Easy On The Go And The Planet •
            Sustainable • Compostable • Export Ready •
          </span>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="categories-section">
        <h2 className="section-title">Product Categories</h2>

        <div className="categories-grid">
          {[
            {
              name: "Tableware",
              link: "/products/tableware",
              img: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424880/Tableware_category_lpkc9w.png"
            },
            {
              name: "Toilet Roll",
              link: "/products/toilet-roll",
              img: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424881/Toilet_paper_category_ukhhau.png"
            },
            {
              name: "Napkins",
              link: "/products/napkins",
              img: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424880/Napkins_category_o79vvf.png"
            },
            {
              name: "Tissues",
              link: "/products/tissues",
              img: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424881/Tissues_category_tc4skr.png"
            },
            {
              name: "Kitchen Towel",
              link: "/products/kitchen-towel",
              img: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424879/kitchentowel_category_xx54tc.png"
            }
          ].map((c, i) => (
            <Link key={i} to={c.link} className="category-card">
              <img src={c.img} alt={c.name} />
              <h3>{c.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= WHY HEALPLANET ================= */}
<section className="why-section">
  <div className="why-container">
    <h2 className="why-title">Why HealPlanet</h2>
    <p className="why-subtitle">
      Built for sustainability, scale, and global compliance.
    </p>

    <div className="why-grid">
      <div className="why-card">
        <div className="why-icon">🌱</div>
        <h4>Eco-Friendly Materials</h4>
        <p>
          Made using certified compostable and sustainable raw materials that
          reduce environmental impact.
        </p>
      </div>

      <div className="why-card">
        <div className="why-icon">🚢</div>
        <h4>Export Ready</h4>
        <p>
          Designed for bulk export with international food-safety and packaging
          compliance standards.
        </p>
      </div>

      <div className="why-card">
        <div className="why-icon">🌍</div>
        <h4>Global Supply Chain</h4>
        <p>
          Trusted supply partner for restaurants, distributors, and food brands
          worldwide.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* ================= CERTIFICATIONS ================= */}
      <section className="cert-section">
        <h2 className="section-title">Certifications</h2>

        <div className="cert-grid">
          {[
            "https://res.cloudinary.com/duroecr2t/image/upload/v1766424946/Certificate-1_dfzqp1.png",
            "https://res.cloudinary.com/duroecr2t/image/upload/v1766424945/Certificate-3_vbuk4a.png",
            "https://res.cloudinary.com/duroecr2t/image/upload/v1766424942/Certificate-4_jruiij.png",
            "https://res.cloudinary.com/duroecr2t/image/upload/v1766424943/Certificate-2_ivibk8.png"
          ].map((img, i) => (
            <div
  key={i}
  className="cert-card"
  onClick={() => setActiveCert(img)}
>
  <img src={img} alt="Certification" />
</div>

          ))}
        </div>
      </section>

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



      {/* ================= CTA ================= */}
      <section className="cta-final">
        <h2>Looking for Bulk Orders or Custom Branding?</h2>
        <p>
          Partner with HealPlanet for premium eco-friendly products.
        </p>

        <Link to="/contact">
          <button className="cta-final-btn">Contact Us</button>
        </Link>
      </section>

    </div>
  );
}
