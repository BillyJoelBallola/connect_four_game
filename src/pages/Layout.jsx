import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="min-h-screen bg-violet-600 text-white">
      <Outlet />
    </main>
  );
};

export default Layout;
