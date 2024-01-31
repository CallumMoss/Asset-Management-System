import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Admin({ username, userRole }) {
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
        <section className="admin-functions">
          <h1>Admin Dashboard</h1>
          <div className="admin-section">
            <h2>User Management</h2>
            <p>Manage user accounts, roles, and access permissions.</p>
            {/* User management functionalities */}
          </div>
          <div className="admin-section">
            <h2>System Settings</h2>
            <p>Configure system parameters, backup settings, and more.</p>
            {/* System settings functionalities */}
          </div>
          <div className="admin-section">
            <h2>Activity Logs</h2>
            <p>View logs of system and user activities.</p>
          </div>
        </section>
      </main>

      <footer></footer>
    </div>
  );
}

export default Admin;
