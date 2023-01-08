import React, { forwardRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import "../styles/navbar.css";

const pages = ["Home"];
const settings = ["Login", "Registrarse", "Salir"];
const loggedSettings = ["Tareas", "Salir"];

const Navbar = () => {
  const isAuth = localStorage.getItem("isAuth");
  const usePathName = () => {
    const location = useLocation();
    return location.pathname;
  };

  let navigate = useNavigate();

  const LinkBehavior = forwardRef((props, ref) => (
    <Link
      ref={ref}
      to="/"
      {...props}
      role={undefined}
      style={{ textDecoration: "none" }}
    />
  ));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    let textElement = event.target.text;

    switch (textElement) {
      case "Registrarse":
        navigate("/signup");
        break;
      default:
        break;
    }

    setAnchorElUser(null);
  };

  return (usePathName() === "/") |
    (usePathName() === "/signup") |
    (usePathName() === "/login") |
    (usePathName() === usePathName()) ? (
    <AppBar
      position="static"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AssignmentIcon
            className="brand-icon"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            className="brand-text"
            variant="h6"
            noWrap
            component={LinkBehavior}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Lista Tareas
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            className="burger-menu"
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={LinkBehavior}
                    underline="none"
                    sx={{ color: "black" }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AssignmentIcon
            className="brand-icon"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            className="brand-text"
            variant="h5"
            noWrap
            component={LinkBehavior}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Lista Tareas
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className="pages"
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={LinkBehavior}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} className="settings">
            <Tooltip title="Abrir funcionalidades">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle style={{ color: "white" }} />
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
              {isAuth
                ? loggedSettings.map((setting) => {
                    return (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Link
                          to={
                            setting === loggedSettings[0] ? "/task" : "/logout"
                          }
                          underline="none"
                          className="text-link"
                        >
                          {setting}
                        </Link>
                      </MenuItem>
                    );
                  })
                : settings.map((setting) => {
                    if (setting === settings[1] || setting === settings[2]) {
                      return (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Link
                            to={setting === settings[1] ? "/signup" : "/logout"}
                            underline="none"
                            className="text-link"
                          >
                            {setting}
                          </Link>
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Link
                            to={setting.toLocaleLowerCase()}
                            underline="none"
                            className="text-link"
                          >
                            {setting}
                          </Link>
                        </MenuItem>
                      );
                    }
                  })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    <></>
  );
};

export default Navbar;
