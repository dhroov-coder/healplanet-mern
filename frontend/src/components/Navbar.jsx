import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
       🌍 HealPlanet
      </Link>

      <button className="nav-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/categories" onClick={() => setOpen(false)}>Products</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About</Link>
        <Link to="/certifications" onClick={() => setOpen(false)}>Certifications</Link>
        <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

        {/* 🔽 DOWNLOAD (ALWAYS LAST) */}
        <a
          href="/Navbar/HealPlanetInternationalQR.pdf"
          download
          className="nav-download"
          onClick={() => setOpen(false)}
        >
          Download
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
