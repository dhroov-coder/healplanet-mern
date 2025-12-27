import { NavLink, useNavigate } from "react-router-dom";
import { Home, Package, PlusCircle, Mail, LogOut } from "lucide-react";

export default function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    marginBottom: "8px",
    borderRadius: "8px",
    color: isActive ? "#fff" : "#e0f5eb",
    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
    fontWeight: 500,
    transition: "0.25s",
  });

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      {/* Brand */}
      <div className="brand">HealPlanet</div>

      <NavLink to="/admin/dashboard" style={linkStyle} onClick={closeSidebar}>
        <Home size={18} /> Dashboard
      </NavLink>

      <NavLink to="/admin/products" style={linkStyle} onClick={closeSidebar}>
        <Package size={18} /> Manage Products
      </NavLink>

      <NavLink to="/admin/products/add" style={linkStyle} onClick={closeSidebar}>
        <PlusCircle size={18} /> Add Product
      </NavLink>

      <NavLink to="/admin/enquiries" style={linkStyle} onClick={closeSidebar}>
        <Mail size={18} /> View Enquiries
      </NavLink>

      <button
        onClick={handleLogout}
        className="admin-logout"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
