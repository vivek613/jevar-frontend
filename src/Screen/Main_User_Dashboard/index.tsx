import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHeader from "./Header";
import CustomerList from "./Customer_List";
import HomeDash from "./Home";
import Collection from "./Collection";
import UserDetails from "./userDetails";
import { Offer_List } from "./Offer_List";


const Dashboard = () => {
  return (
    <Router>
      <DashboardHeader />
      <Routes>
        <Route path="/" element={<HomeDash />} />
        <Route path="customer-list" element={<CustomerList />} />
        <Route path="user-details" element={<UserDetails />} />
        <Route path="add-collection" element={<Collection />} />
        <Route path="offer-List" element={<Offer_List/>} />
      </Routes>
    </Router>
  );
};

export default Dashboard;
