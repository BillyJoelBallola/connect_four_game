import React from "react";

const TimerBoard = ({ attacker, timer }) => {
  return (
    <div
      className={`${
        attacker === 1 ? "bg-amber-500" : "bg-rose-400"
      } sm-border font-semibold flex flex-col items-center p-4 absolute -bottom-20`}
    >
      <span>PLAYER 1'S TURN</span>
      <span className="text-[3.5rem] -m-4">{timer}s</span>
    </div>
  );
};

export default TimerBoard;
