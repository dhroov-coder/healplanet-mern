import { useEffect, useState } from "react";
import axios from "axios";

export default function Enquiries() {
  const [items, setItems] = useState([]);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    axios
      .get("http://localhost:5000/api/admin/enquiries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container" style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "25px", color: "var(--green)" }}>
        Enquiries
      </h1>

      {items.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No enquiries received yet.</p>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          {!isMobile && (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i._id}>
                    <td>{i.name}</td>
                    <td>{i.email}</td>
                    <td>{i.product || "—"}</td>
                    <td>{i.quantity || "—"}</td>
                    <td style={{ maxWidth: 260 }}>{i.message}</td>
                    <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ================= MOBILE CARDS ================= */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map((i) => (
                <div
                  key={i._id}
                  style={{
                    background: "#fff",
                    padding: "16px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                  }}
                >
                  <p><b>Name:</b> {i.name}</p>
                  <p><b>Email:</b> {i.email}</p>
                  <p><b>Product:</b> {i.product || "—"}</p>
                  <p><b>Quantity:</b> {i.quantity || "—"}</p>

                  {i.message && (
                    <p style={{ marginTop: "8px", opacity: 0.85 }}>
                      <b>Message:</b><br />{i.message}
                    </p>
                  )}

                  <p style={{ marginTop: "10px", fontSize: "13px", opacity: 0.6 }}>
                    {new Date(i.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
