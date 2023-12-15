import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHeader from "./Header";
import AdminHome from "./home";

const AdminDashboard = () => {
  return (
    <>
      <Router>
        <DashboardHeader />
        <Routes>
          <Route path="/" element={<AdminHome />} />
        </Routes>
      </Router>
    </>
  );
};

export default AdminDashboard;
