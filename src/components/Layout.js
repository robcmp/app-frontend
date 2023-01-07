import React from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes in the App */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/*End Public routes in the App */}
      </Routes>
    </Router>
  );
};

export default Layout;
