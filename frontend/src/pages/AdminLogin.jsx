// frontend/src/pages/AdminLogin.jsx
import { useState } from "react";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminInfo", JSON.stringify(res.data.admin));
      alert("Admin logged in");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 480, margin: "40px auto" }}>
      <h2 style={{ marginBottom: 20 }}>Admin Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      />
      <input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      />

      <button onClick={submit} style={{ padding: "10px 18px", background: "var(--green)", color: "#fff", border: "none" }}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default AdminLogin;
