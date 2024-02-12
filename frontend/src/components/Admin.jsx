import React from "react";
import "./style.css"; // Importing component-specific styles
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom

function Admin({ username, userRole }) {
  return (
    <div>
      {/* Header section */}
      <header>
        <nav className="navbar">
          <Link to="/dashboard">Dashboard</Link> {/* Dashboard link */}
          {/* Conditional rendering of Assets and Admin links based on userRole */}
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
        <section className="admin-functions">
          <h1>Admin Dashboard</h1> {/* Heading for admin dashboard */}
          {/* Section for user management */}
          <div className="admin-section">
            <h2>User Management</h2> {/* Subheading for user management */}
            <p>Manage user accounts, roles, and access permissions.</p> {/* Description of user management functionalities */}
            {/* User management functionalities */}
          </div>
          {/* Section for system settings */}
          <div className="admin-section">
            <h2>System Settings</h2> {/* Subheading for system settings */}
            <p>Configure system parameters, backup settings, and more.</p> {/* Description of system settings functionalities */}
            {/* System settings functionalities */}
          </div>
          {/* Section for activity logs */}
          <div className="admin-section">
            <h2>Activity Logs</h2> {/* Subheading for activity logs */}
            <p>View logs of system and user activities.</p> {/* Description of activity logs */}
          </div>
        </section>
      </main>

      <footer></footer> {/* Footer section */}
    </div>
  );
}

export default Admin;
