import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NavigationBar from "../Component/navigationBar";
import Register from "../Component/Auth/seller_user/register";
import Login from "../Component/Auth/seller_user/login";
import UsedJewellry from "./UsedJewellry";
import UsedJewellryDetails from "./UsedJewellry/details";
import UserProfile from "./NormalUser/UserProfile";
import Privacy from "./Privacy";
import Terms from "./Terms";
import Collection from "./Jewellers_collection";
import CollectionDetails from "./Jewellers_collection/details";
import Service from "./Service_buy";
import About from "./About";
import SellProduct from "./NormalUser/SellProduct";
import CollectionList from "./collectionList";
import SalesLogin from "../Component/Auth/Sales_user/login";
import SalesRegister from "../Component/Auth/Sales_user/register";
import AdminLogin from "../Component/Auth/admin/login";
import AdminDashboard from "./Admin_dashboard";
import Career from "./Career";

const Index = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="register-sales" element={<SalesRegister />} />
        <Route path="login-sales" element={<SalesLogin />} />
        <Route path="used-jewellry" element={<UsedJewellry />} />
        <Route
          path="/used-jewellry_details"
          element={<UsedJewellryDetails />}
        />
        <Route path="jewellry-collection" element={<Collection />} />
        <Route
          path="jewellry-collection-details"
          element={<CollectionDetails />}
        />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="sell-product" element={<SellProduct />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="about" element={<About />} />
        <Route path="terms-condition" element={<Terms />} />
        <Route path="service" element={<Service />} />
        <Route path="collection-list" element={<CollectionList />} />
        <Route path="career" element={<Career />} />
      </Routes>
    </Router>
  );
};

export default Index;
