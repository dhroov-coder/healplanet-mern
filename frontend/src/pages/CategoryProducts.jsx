import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
     .get(`${API}/api/products?category=${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <div className="container" style={{ padding: "50px 20px" }}>
      <h1 style={{ marginBottom: "35px", color: "var(--green)" }}>
        {category.toUpperCase()}
      </h1>

      {/* CATALOG GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
        }}
      >
        {products.map((p) => (
          <Link
            key={p._id}
            to={`/product/${p.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                transition: "0.3s",
                height: "100%",
              }}
            >
              {/* IMAGE */}
              <img
                src={p.images?.[0] || "/img/placeholder-product.png"}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  marginBottom: "15px",
                }}
              />

              {/* TITLE */}
              <h2
                style={{
                  fontSize: "20px",
                  marginBottom: "8px",
                  color: "var(--green)",
                }}
              >
                {p.name}
              </h2>

              {/* DESCRIPTION */}
              <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "12px" }}>
                {p.description || "Eco-friendly tissue & hygiene product"}
              </p>

              {/* VARIANTS TABLE (PDF STYLE) */}
              {p.variants && p.variants.length > 0 && (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#f3f3f3" }}>
                      <th style={th}>Size</th>
                      <th style={th}>Ply</th>
                      <th style={th}>GSM</th>
                      <th style={th}>Sheets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.variants.map((v, i) => (
                      <tr key={i}>
                        <td style={td}>{v.size || "-"}</td>
                        <td style={td}>{v.ply || "-"}</td>
                        <td style={td}>{v.gsm || "-"}</td>
                        <td style={td}>{v.sheetsPerPack || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* VIEW CTA */}
              <div
                style={{
                  marginTop: "15px",
                  fontSize: "14px",
                  color: "var(--green)",
                  fontWeight: 600,
                }}
              >
                View Details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const th = {
  padding: "6px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const td = {
  padding: "6px",
  border: "1px solid #ddd",
  textAlign: "center",
};

export default CategoryProducts;
