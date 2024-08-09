import React from "react";

const MobileScoreBoard = ({ scores }) => {
  return (
    <div className="mx-auto w-[80%] md:w-[500px] grid md:hidden grid-cols-2 gap-4">
      <div className="relative p-2 sm-border flex flex-col items-center font-semibold bg-white text-black">
        <img
          src="/yellow-emoji.png"
          alt="emoji"
          className="w-10 absolute top-[50%] -translate-y-[50%] -left-6"
        />
        <span>PLAYER 1</span>
        <span className="text-[2.4rem] -m-2">{scores.playerOne}</span>
      </div>
      <div className="relative p-2 sm-border flex flex-col items-center font-semibold bg-white text-black">
        <img
          src="/pink-emoji.png"
          alt="emoji"
          className="w-10 absolute top-[50%] -translate-y-[50%] -right-6"
        />
        <span>PLAYER 2</span>
        <span className="text-[2.8rem] -m-2">{scores.playerTwo}</span>
      </div>
    </div>
  );
};

export default MobileScoreBoard;
