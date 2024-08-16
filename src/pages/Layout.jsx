import React from "react";
import { Outlet } from "react-router-dom";
import { SettingsContextProvider } from "../context/SettingsContext";

const Layout = () => {
  return (
    <SettingsContextProvider>
      <main className="min-h-screen bg-violet-600 text-white">
        <Outlet />
      </main>
    </SettingsContextProvider>
  );
};

export default Layout;
