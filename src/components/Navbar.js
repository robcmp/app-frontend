import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Navbar = () => {
  return (
    <AppBar position="relative" color="primary">
      <Toolbar>
        <AssignmentIcon sx={{ mr: 2 }} />
        <Typography variant="h6">Lista de Tarea</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
