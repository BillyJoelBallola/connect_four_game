import React from "react";
import { NavLink } from "react-router-dom";

const Controls = ({ restart }) => {
  return (
    <div className="flex items-center justify-between mx-auto w-[90%] md:w-[500px]">
      <NavLink
        to={"/"}
        className="bg-violet-900 hover:bg-violet-800 duration-200 py-1 px-4 rounded-full"
      >
        MENU
      </NavLink>
      <img src="/logo.png" alt="logo" className="w-12" />
      <button
        onClick={restart}
        className="bg-violet-900 hover:bg-violet-800 duration-200 py-1 px-4 rounded-full"
      >
        RESTART
      </button>
    </div>
  );
};

export default Controls;
