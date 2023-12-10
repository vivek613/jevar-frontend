import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHeader from "./Header";
import SalesHome from "./home";

const SalesDashboard = () => {
  return (
    <>
      <Router>
        <DashboardHeader />
        <Routes>
          <Route path="/" element={<SalesHome />} />
        </Routes>
      </Router>
    </>
  );
};

export default SalesDashboard;
