import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    quantity: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${slug}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [slug]);

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/contact", {
        ...form,
        product: product.name,
      })
      .then(() => {
        alert("Your enquiry has been submitted!");
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  if (!product) return null;

  return (
    <div className="container" style={{ padding: "40px 16px" }}>
      
      {/* TITLE */}
      <h1 style={{ color: "var(--green)", marginBottom: "10px" }}>
        {product.name}
      </h1>

      <p style={{ maxWidth: "720px", opacity: 0.8 }}>
        {product.description}
      </p>

      {/* IMAGE + FEATURES */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          marginTop: "35px",
          flexWrap: "wrap",
        }}
      >
        {/* IMAGE */}
        <img
          src={product.images?.[0] || "https://placehold.co/600x400"}
          alt={product.name}
          style={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "14px",
            boxShadow: "0 8px 22px rgba(0,0,0,0.1)",
          }}
        />

        {/* FEATURES */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            {[
              "100% Compostable",
              "PFAS Free",
              "Eco Friendly",
              "Food Safe",
            ].map((f, i) => (
              <span
                key={i}
                style={{
                  background: "#E7F3EC",
                  padding: "8px 14px",
                  borderRadius: "18px",
                  fontSize: "13px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* VARIANTS TABLE */}
      {product.variants?.length > 0 && (
        <>
          <h2 style={{ marginTop: "50px", marginBottom: "18px" }}>
            Available Sizes & Specifications
          </h2>

          <div className="variant-table-wrapper">
            <table className="variant-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Ply</th>
                  <th>GSM</th>
                  <th>Sheets / Pack</th>
                  <th>Packs / Carton</th>
                </tr>
              </thead>
              <tbody>
                {product.variants.map((v, i) => (
                  <tr key={i}>
                    <td>{v.size || "-"}</td>
                    <td>{v.ply || "-"}</td>
                    <td>{v.gsm || "-"}</td>
                    <td>{v.sheetsPerPack || "-"}</td>
                    <td>{v.packsPerCarton || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* MOQ BLOCK */}
      <div
        style={{
          marginTop: "50px",
          background: "#E7F3EC",
          padding: "26px",
          borderRadius: "14px",
        }}
      >
        <h2>MOQ & Export Information</h2>
        <p>MOQ: 10,000 pcs</p>
        <p>OEM / Custom Branding Available</p>
        <p>Export Ready | Lead Time: 15–30 Days</p>

        <button
          onClick={() => setShowModal(true)}
          style={{
            marginTop: "18px",
            background: "var(--green)",
            color: "#fff",
            padding: "13px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Request Quote
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h2>Request Quote</h2>

            <div className="modal-form">
              {["name", "email", "company", "country", "quantity"].map((f) => (
                <input
                  key={f}
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={(e) =>
                    setForm({ ...form, [f]: e.target.value })
                  }
                />
              ))}

              <textarea
                placeholder="Message"
                rows="4"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <div className="modal-actions">
                <button className="btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
