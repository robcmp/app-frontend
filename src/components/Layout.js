import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Navbar from "./Navbar";
import NotFound from "../views/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import Task from "../views/Task";

const Layout = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes in the App */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/*End Public routes in the App */}

        {/* Routes for Auth Users */}
        <Route element={<PrivateRoutes />}>
          <Route path="/task" element={<Task />} />
        </Route>
        {/* End Routes for Auth Users */}

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default Layout;
