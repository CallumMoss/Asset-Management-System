import React, {useState} from "react";
import { Link } from "react-router-dom";

function Dashboard({ username, userRole }) {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
    return (
        <div>
            <header>
                <nav className="navbar">
                    <Link to="/">Log Out</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/assets">Assets</Link>
                    {userRole === "Admin" && (
                        <div className="dropdown">
                            <Link to="#" className="dropbtn" onClick={toggleDropdown}>Admin</Link>
                            {isDropdownVisible && (
                                <div className="dropdown-content">
                                    <Link to="/admin/user-management">User Management</Link>
                                    <Link to="/admin/asset-types">Asset Types</Link>
                                    <Link to="/admin/asset-attributes">Asset Attributes</Link>
                                    <Link to="/admin/logs">Logs</Link>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
                <div className="login-info">
                    <span>Welcome, {username}</span> <span>Role: {userRole}</span>
                </div>
            </header>

            <main>
                <div className="quick-access">
                    <Link to="/create-asset">
                        <button>Create New Asset</button>
                    </Link>
                    <button onClick={() => (window.location.href = "recent-updates.html")}>View Recent Updates</button>
                    <button id="searchLink">Search</button>
                </div>
            </main>

            <footer>{/* Your footer content */}</footer>
        </div>
    );
}

export default Dashboard;
