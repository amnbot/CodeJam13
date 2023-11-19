import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SchoolIcon from "@mui/icons-material/School";

import { useNavigate } from "react-router-dom";
import "./Header.css";
import eventEmitter from "../services/EventEmitter";

const pages = ["Dashboard", "Exercise", "Create", "Group"];
const links = ["/", "/exercise", "/create-exam"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const page = ["/", "/profile", "/account", "/dashboard", "/logout"];

const ResponsiveAppBar = () => {
  console.log("ResponsiveAppBar");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const openSideBar = () => {
    eventEmitter.emit("sideBarClicked");
  };

  const handleOpenNavBar = () => {
    openSideBar();
  };

  const handleCloseNavMenu = (page) => {
    if (page === "Group") {
      console.log("Button clicked in ComponentB");
      openSideBar();
    } else {
      navigate(links[pages.indexOf(page)]);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "logout") {
      eventEmitter.emit("loggedOut");
      return;
    }
    navigate(page[settings.indexOf(setting)]);
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ padding: 0, background: "rgb(15 23 42)" }}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => handleOpenNavBar()}
            sx={{ mr: 2, background: "rgb(15 23 42)" }}
          >
            <MenuIcon />
          </IconButton>
          <div className="mx-10 inline-flex justify-center items-center">
            <SchoolIcon />
            <div className="mx-4 tracking-tight font-bold italic text-3xl">
              Quizzler
            </div>
          </div>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          ></Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://lh3.googleusercontent.com/a/ACg8ocKEGRrJNqRli1nzSOzog50Y20VUxt-fuBHRtBkIjZLf7cM=s96-c" />
              </IconButton>
            </Tooltip>
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
