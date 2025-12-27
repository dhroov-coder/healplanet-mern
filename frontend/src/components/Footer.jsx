function Footer() {
  return (
    <footer className="site-footer">
      <h3 className="footer-title">HealPlanet International</h3>

      <p className="footer-tagline">
        Built for the Earth. Chosen by the World.
      </p>

      {/* SOCIAL ICONS */}
      <div className="footer-socials">
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

      <p className="footer-email">
        info@healplanetinternational.org
      </p>

      <p className="footer-copy">
        © {new Date().getFullYear()} HealPlanet International. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
