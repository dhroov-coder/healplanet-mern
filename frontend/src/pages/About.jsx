import "./About.css";

export default function About() {
  return (
    <div className="about-wrapper">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About HealPlanet International</h1>
          <p>
  Certified compostable packaging solutions designed for the
  global prepared food industry. <br />
  We are committed to creating eco-friendly, sustainable, and
  health-driven products that elevate everyday living.
</p>

        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="info-section">
        <div className="info-image">
          <img
            src="About/Who we are.png"
            alt="Eco Packaging"
          />
        </div>

        <div className="info-text">
          <h2>Who We Are</h2>
          <p>
            HealPlanet International is an export-focused company specializing
            in high-performance, certified compostable packaging for the
            prepared food industry.
          </p>

          <p>
            We supply a complete range of sustainable solutions — from meal
            containers and clamshells to cutlery, cups, napkins, and accessories —
            designed to support the entire menu of restaurants, cafés, and food
            service providers worldwide.
          </p>
        </div>
      </section>

      {/* OUR MISSION & DRIVE */}
      <section className="info-section reverse">
        <div className="info-text">
          <h2>Our Mission & Drive</h2>

          <p>
            We exist to solve one of the planet’s most urgent problems:
            single-use plastic waste.
          </p>

          <p>
            Our decision to enter the export market was driven by the clear need
            for globally accessible, genuinely earth-friendly alternatives.
            We empower food businesses to transition away from polluting plastics,
            creating an immediate and measurable reduction in environmental impact.
          </p>

          <p>
            Every product we export is engineered to safely break down into
            nutrient-rich compost, meeting strict international standards for
            food safety and environmental responsibility.
          </p>
        </div>

        <div className="info-image">
          <img
            src="About/Our Mission and drive.png"
            alt="Sustainability Mission"
          />
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="values-section">
        <h2>Our Core Values</h2>

        <div className="values-grid">
          <div className="value-card">
            <h3>Sustainability</h3>
            <p>
              Products designed to return safely to nature, not harm it.
            </p>
          </div>

          <div className="value-card">
            <h3>Integrity</h3>
            <p>
              Transparent materials, certified processes, and honest claims.
            </p>
          </div>

          <div className="value-card">
            <h3>Performance</h3>
            <p>
              Packaging that meets real-world food service demands.
            </p>
          </div>

          <div className="value-card">
            <h3>Global Responsibility</h3>
            <p>
              Helping businesses worldwide make sustainability the standard.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
