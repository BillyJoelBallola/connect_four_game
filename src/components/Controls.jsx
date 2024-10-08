import React from "react";

const Controls = ({ openConfirmRestart, leaveTheGame }) => {
  return (
    <div className="flex items-center justify-between mx-auto w-[90%] md:w-[500px]">
      <button
        onClick={leaveTheGame}
        className="bg-violet-900 hover:bg-violet-800 duration-200 py-1 w-[100px] rounded-full"
      >
        MENU
      </button>
      <img src="/logo.png" alt="logo" className="w-12" />
      <button
        onClick={openConfirmRestart}
        className="bg-violet-900 hover:bg-violet-800 duration-200 py-1 w-[100px] rounded-full"
      >
        RESTART
      </button>
    </div>
  );
};

export default Controls;
