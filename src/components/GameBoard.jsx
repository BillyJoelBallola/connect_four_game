import React from "react";

const GameBoard = ({ circles, placeAttack }) => {
  return (
    <div className="w-[90%] md:w-[500px] grid gap-2 md:gap-6 bg-white lg-border-game p-4 pb-10">
      {circles.map((row, rowIdx) => (
        <div className="grid gap-6 place-items-center grid-cols-7" key={rowIdx}>
          {row.map((item, colIdx) => (
            <button
              onClick={() => placeAttack(colIdx)}
              key={colIdx}
              className={`${
                item === 1
                  ? "bg-yellow-500"
                  : item === 2
                  ? "bg-rose-400"
                  : "bg-violet-600"
              } sm-circle-border-top w-10 md:w-12 aspect-square rounded-full`}
            ></button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
