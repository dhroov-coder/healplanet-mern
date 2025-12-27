import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-wrap">
      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* MAIN */}
      <div style={{ flex: 1 }}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
