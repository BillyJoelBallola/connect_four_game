import React from "react";
import { NavLink } from "react-router-dom";

const Rules = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="relative grid gap-8 lg-border-white text-black bg-white p-4 pb-8 md:p-8 md:pb-12 md:w-[500px] w-[90%]">
        <h1 className="text-center text-[3rem] md:text-[3.4rem] font-semibold">
          RULES
        </h1>
        <div className="grid gap-2">
          <h2 className="text-xl font-semibold text-violet-600">OBJECTIVES</h2>
          <p>
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally, or diagonally).
          </p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-xl font-semibold text-violet-600">HOW TO PLAY</h2>
          <ol className="list-decimal px-4 grid gap-2">
            <li>Choose who's the first player.</li>
            <li>
              Player's must alternate turns, and only one can be dropped in each
              turn.
            </li>
            <li>The games end when there is 4-in-a-row or draw.</li>
            <li>Turn can be waste by dropping to full column.</li>
            <li>
              The last player of the previous game goes to second on the next
              game.
            </li>
          </ol>
        </div>
        <NavLink
          to={"/"}
          className="absolute left-[50%] -translate-x-[50%] -bottom-10"
        >
          <img src="/check.png" alt="check" />
        </NavLink>
      </div>
    </div>
  );
};

export default Rules;
