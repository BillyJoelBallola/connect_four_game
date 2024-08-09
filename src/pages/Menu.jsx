import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="grid gap-8 md:gap-12 lg-border md:bg-violet-700 md:p-8 md:w-auto w-[90%]">
        <img src="/logo.png" alt="logo" className="w-12 mx-auto my-8" />
        <div className="grid gap-4 text-black">
          <NavLink
            to="/game"
            className="sm-border flex gap-4 items-center justify-between text-lg md:text-xl font-semibold h-16 px-6 bg-amber-400 hover:bg-amber-300 duration-200 border-black"
          >
            <span>PLAYER VS PLAYER</span>
            <img src="/btn-emoji.png" alt="icon" className="w-16" />
          </NavLink>
          <NavLink
            to="/rules"
            className="sm-border flex items-center text-lg md:text-xl font-semibold h-16 px-6 bg-white hover:bg-gray-200 duration-200 border-black"
          >
            GAME RULES
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
