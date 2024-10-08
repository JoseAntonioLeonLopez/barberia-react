import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-mode-bg2 min-h-screen">
      <NavbarComponent />
        <Outlet />
    </div>
  );
};

export default Dashboard;
