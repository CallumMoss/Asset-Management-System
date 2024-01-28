import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <nav className="navbar">
          <a href="index.html">Home</a>
          <a href="dashboard.html" className="active">
            Dashboard
          </a>
          {/* Mark as active since we're on the dashboard */}
          <a href="assets.html">Assets</a>
          <a href="admin.html">Admin Panel</a>
        </nav>
        <div className="login-info">
          <span>Welcome, [Username]</span> | <span>Role: [User Role]</span>
        </div>
      </header>

      <main>
        <div className="quick-access">
          <button onClick={() => (window.location.href = "add-asset.html")}>
            Add New Asset
          </button>
          <button
            onClick={() => (window.location.href = "recent-updates.html")}>
            View Recent Updates
          </button>
          <button id="searchLink">Search</button>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default Dashboard;
