import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ products: 0, enquiries: 0 });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    axios
     .get(`${API}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setCounts(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: 25 }}>Dashboard Overview</h1>

      <div className="grid-3">
        <div className="card">
          <h3>Total Products</h3>
          <p>{counts.products}</p>
        </div>

        <div className="card">
          <h3>Total Enquiries</h3>
          <p>{counts.enquiries}</p>
        </div>

        <div className="card">
          <h3>Status</h3>
          <p>Active</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 30 }}>
        <h3>Quick Actions</h3>
        <button
          onClick={() => (window.location.href = "/admin/products/add")}
          style={{
            marginTop: 12,
            background: "var(--green)",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          + Add New Product
        </button>
      </div>
    </>
  );
}
