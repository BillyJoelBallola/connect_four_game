import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

const GameBoard = ({ discs, placeAttack, isVictor, scores }) => {
  const { settings } = useContext(SettingsContext);

  return (
    <div className="flex items-center justify-around w-full px-4 md:p-0">
      <div className="relative p-4 pt-6 sm-border hidden md:flex flex-col items-center font-semibold bg-white text-black">
        <img
          src="/yellow-emoji.png"
          alt="emoji"
          className="w-10 absolute -top-6"
        />
        <span>PLAYER 1</span>
        <span className="text-[3.5rem] -m-4">{scores.playerOne}</span>
      </div>
      <div className="md:w-auto grid gap-2 place-items-center md:gap-6 bg-white lg-border-game p-4 pb-10">
        {discs.map((row, rowIdx) => (
          <div
            data-size={`${settings?.boardSize?.code}`}
            className="gameBoard grid gap-6 place-items-center"
            key={rowIdx}
          >
            {row.map((item, colIdx) => (
              <button
                disabled={isVictor}
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
      <div className="relative p-4 pt-6 sm-border hidden md:flex flex-col items-center font-semibold bg-white text-black">
        <img
          src="/pink-emoji.png"
          alt="emoji"
          className="w-10 absolute -top-6"
        />
        <span>PLAYER 2</span>
        <span className="text-[3.5rem] -m-4">{scores.playerTwo}</span>
      </div>
    </div>
  );
};

export default GameBoard;
