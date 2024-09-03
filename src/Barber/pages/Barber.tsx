import React from "react";
import { Outlet } from "react-router-dom";

const Barber: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-mode-bg2 min-h-screen">
        <Outlet />
    </div>
  );
};

export default Barber;
