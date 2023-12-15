import React from "react";
import Index from "./Screen";
import Dashboard from "./Screen/Main_User_Dashboard";
import { useSelector } from "react-redux";
import SalesDashboard from "./Screen/Sales_User_Dashboard";
import AdminDashboard from "./Screen/Admin_dashboard";

function App() {
  const mainUserAuth = useSelector((state: any) => state.mainAuth);
  const salesUserAuth = useSelector((state: any) => state.salesAuth);
  const adminUserAuth = useSelector((state: any) => state.adminAuth);

  console.log("sale", salesUserAuth);
  return (
    <>
      {mainUserAuth.isLoggedIn ? (
        <Dashboard />
      ) : salesUserAuth?.isLoggedIn ? (
        <SalesDashboard />
      ) : adminUserAuth?.isLoggedIn ? (
        <AdminDashboard />
      ) : (
        <Index />
      )}
    </>
  );
}

export default App;
