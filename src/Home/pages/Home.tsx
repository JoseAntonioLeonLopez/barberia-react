import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-mode-bg2 min-h-screen">
      <NavbarComponent />
      {/*<div className="content p-4 mt-6 mb-6 max-w-4xl mx-auto">*/}
        <Outlet />
    </div>
  );
};

export default Home;
