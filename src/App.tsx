import React from "react";
import Index from "./Screen";
import Dashboard from "./Screen/Main_User_Dashboard";
import { useSelector } from "react-redux";
import SalesDashboard from "./Screen/Sales_User_Dashboard";

function App() {
  const mainUserAuth = useSelector((state: any) => state.mainAuth);
  const salesUserAuth = useSelector((state: any) => state.salesAuth);
console.log("sale",salesUserAuth)
  return <>{mainUserAuth.isLoggedIn ? <Dashboard /> : salesUserAuth?.isLoggedIn?<SalesDashboard/>:<Index />}</>;
}

export default App;
