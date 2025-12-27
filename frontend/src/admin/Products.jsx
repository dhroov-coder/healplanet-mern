import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Search } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;


export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    axios
      .get(`${API}/api/admin/products`, {
       headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const token = localStorage.getItem("adminToken");

    await axios.delete(`${API}/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    setProducts(products.filter((p) => p._id !== id));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <h1 style={{ marginBottom: 20 }}>Manage Products</h1>

      {/* 🔍 Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
          background: "#fff",
          padding: "10px 14px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          maxWidth: "360px",
        }}
      >
        <Search size={18} />
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "14px",
          }}
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      {!isMobile && (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.images?.[0]}
                      alt="thumb"
                      width="60"
                      height="60"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.slug}</td>
                  <td>
                    <button
                      onClick={() =>
                        (window.location.href = `/admin/products/edit/${product._id}`)
                      }
                      className="btn"
                      style={{ marginRight: "8px", padding: "6px 10px" }}
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      style={{
                        padding: "6px 10px",
                        background: "#d9534f",
                        color: "#fff",
                        borderRadius: "6px",
                        border: "none",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* ================= MOBILE CARDS ================= */}
      {isMobile && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#fff",
                padding: "14px",
                borderRadius: "14px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <img
                src={product.images?.[0]}
                alt="thumb"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                }}
              />

              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600 }}>{product.name}</p>
                <p style={{ fontSize: "13px", opacity: 0.7 }}>
                  {product.category}
                </p>

                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <button
                    onClick={() =>
                      (window.location.href = `/admin/products/edit/${product._id}`)
                    }
                    className="btn"
                    style={{ padding: "6px 10px" }}
                  >
                    <Edit size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    style={{
                      padding: "6px 10px",
                      background: "#d9534f",
                      color: "#fff",
                      borderRadius: "6px",
                      border: "none",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
