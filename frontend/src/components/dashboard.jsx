import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard({ username, userRole }) {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <nav className="navbar">
          <Link to="/">Log Out</Link>
          <Link to="/dashboard">Dashboard</Link>
          {userRole === "Admin" || userRole === "User" ? (
            <>
              <Link to="/assets">Assets</Link>
              {userRole === "Admin" ? <Link to="/admin">Admin</Link> : null}
            </>
          ) : null}
        </nav>
        <div className="login-info">
          <span>Welcome, {username}</span> <span>Role: {userRole}</span>
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

      <footer>{/* Your footer content */}</footer>
    </div>
  );
}

export default Dashboard;
