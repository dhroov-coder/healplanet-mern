import { Bell, Menu } from "lucide-react";

export default function Header({ toggleSidebar }) {
  return (
    <header
      className="admin-header"
      style={{
        background: "var(--green)",
        color: "#fff",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* MOBILE MENU */}
        <div className="admin-menu-btn" onClick={toggleSidebar}>
            <Menu size={22} />
        </div>


        <h2 style={{ fontWeight: 700, fontSize: "20px" }}>
          HealPlanet Admin
        </h2>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Bell size={20} />
        <div className="admin-welcome">
          Welcome, Admin
        </div>
      </div>
    </header>
  );
}
