import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard({ username, userRole }) {
  // Hook from React Router to navigate programmatically
  const navigate = useNavigate();

  return (
    <div>
      {/* Header section */}
      <header>
        {/* Navigation links */}
        <nav className="navbar">
          <Link to="/dashboard">Dashboard</Link> {/* Dashboard link */}
          {/* Conditional rendering based on user role */}
          {userRole === "Admin" || userRole === "User" ? (
            <>
              <Link to="/assets">Assets</Link> {/* Assets link */}
              {userRole === "Admin" ? <Link to="/admin">Admin</Link> : null} {/* Admin link (visible only for Admin) */}
            </>
          ) : null}
        </nav>
      </header>

      {/* Main content section */}
      <main>
        {/* Quick access buttons */}
        <div className="quick-access">
          <button onClick={() => (window.location.href = "add-asset.html")}>
            Add New Asset
          </button> {/* Button to add a new asset */}
          <button
            onClick={() => (window.location.href = "recent-updates.html")}>
            View Recent Updates
          </button> {/* Button to view recent updates */}
          <button id="searchLink">Search</button> {/* Button for search */}
        </div>
      </main>

      {/* Footer section */}
      <footer>{/* Your footer content */}</footer>
    </div>
  );
}

export default Dashboard;
