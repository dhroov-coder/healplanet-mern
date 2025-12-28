import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;


function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/products`)

      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "30px", color: "var(--green)" }}>
        Our Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
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
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      <img
        src={p.images?.[0]}
        alt={p.name}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
      />
      <h3 style={{ color: "var(--green)" }}>{p.name}</h3>
      <p style={{ opacity: 0.7 }}>{p.category}</p>
    </div>
  </Link>
))}

      </div>
    </div>
  );
}

export default Products;
