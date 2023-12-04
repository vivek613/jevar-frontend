import React from "react";
import Index from "./Screen";
import Dashboard from "./Screen/Main_User_Dashboard";
import { useSelector } from "react-redux";

function App() {
  const mainUserAuth = useSelector((state: any) => state.mainAuth);
  return <>{mainUserAuth.isLoggedIn ? <Dashboard /> : <Index />}</>;
}

export default App;
