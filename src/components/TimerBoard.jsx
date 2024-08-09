import React from "react";

const TimerBoard = ({ attacker, timer, isVictor, playAgain, isDraw }) => {
  return isVictor || isDraw ? (
    <div className="bg-white text-black sm-border font-semibold flex flex-col items-center py-4 px-10 absolute -bottom-28">
      <span>{isDraw ? "It's a" : `PLAYER ${attacker}`}</span>
      <span className="text-[3.5rem] -m-4">{isDraw ? "DRAW" : "WINS"}</span>
      <button
        onClick={playAgain}
        className="bg-violet-600 hover:bg-violet-500 duration-200 p-1 px-4 text-white rounded-full"
      >
        Play Again
      </button>
    </div>
  ) : (
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
