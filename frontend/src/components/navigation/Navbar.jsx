import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import userIcon from "../user.png"; // Update path if necessary

function Navbar({ username, userRole }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  // Function to handle opening user menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Function to handle closing user menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Function to handle clicking on admin menu
  const handleAdminMenuClick = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  // Function to handle closing admin menu
  const handleAdminMenuClose = () => {
    setAdminAnchorEl(null);
  };

  // User settings menu items
  const userSettings = [
    { text: `Username: ${username}`, action: handleCloseUserMenu }, // No navigation action needed
    { text: `Role: ${userRole}`, action: handleCloseUserMenu }, // No navigation action needed
    { text: "Change Password", action: () => navigate("/changepassword") },
    { text: "Logout", action: () => navigate("/login") },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#89CFF0" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {/* Dashboard Link */}
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/dashboard">
              Dashboard
            </Button>
            {/* Assets Link */}
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/assets">
              Assets
            </Button>
            {/* Admin menu */}
            {userRole === "Admin" && (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                id="admin-menu-button"
                aria-controls={adminAnchorEl ? "admin-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={adminAnchorEl ? "true" : undefined}
                onClick={handleAdminMenuClick}>
                Admin
              </Button>
            )}
            {/* Admin submenu */}
            <Menu
              id="admin-menu"
              anchorEl={adminAnchorEl}
              open={Boolean(adminAnchorEl)}
              onClose={handleAdminMenuClose}
              MenuListProps={{
                "aria-labelledby": "admin-menu-button",
              }}>
              <MenuItem
                onClick={() => {
                  navigate("/admin/user-management");
                  handleAdminMenuClose();
                }}>
                User Management
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/admin/asset-types");
                  handleAdminMenuClose();
                }}>
                Asset Types
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/admin/logs");
                  handleAdminMenuClose();
                }}>
                Logs
              </MenuItem>
            </Menu>
          </Box>

          {/* User settings menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Icon" src={userIcon} />
              </IconButton>
            </Tooltip>
            {/* User settings submenu */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {userSettings.map((setting) => (
                <MenuItem
                  key={setting.text}
                  onClick={() => {
                    setting.action();
                  }}>
                  {setting.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
