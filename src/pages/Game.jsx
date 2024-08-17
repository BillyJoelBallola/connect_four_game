import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import MobileScoreBoard from "../components/MobileScoreBoard";
import StatusBoard from "../components/StatusBoard";
import GameBoard from "../components/GameBoard";
import CustomModal from "../components/CustomModal";
import { NavLink } from "react-router-dom";
import useTimer from "../hooks/useTimer";
import useGameLogic from "../hooks/useGameLogic";
import { SettingsContext } from "../context/SettingsContext";

const Game = () => {
  const { settings, resetBoard } = useContext(SettingsContext);
  const initialScores = { playerOne: 0, playerTwo: 0 };
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [isLeavingGame, setIsLeavingGame] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  const {
    discs,
    scores,
    attacker,
    isVictor,
    isDraw,
    placeAttack,
    switchAttacker,
    setAttacker,
    setScores,
    setIsVictor,
    setIsDraw,
  } = useGameLogic(settings?.boardSize?.size, initialScores);

  const { time, setTime } = useTimer(settings?.timeLimit, () =>
    switchAttacker()
  );

  const restart = () => {
    setScores(initialScores);
    setFirstLoad(true);
    setConfirmRestart(false);
    setAttacker(0);
    resetBoard();
  };

  const playAgain = () => {
    resetBoard();
    setIsVictor(false);
    setIsDraw(false);
    setTime(settings?.timeLimit);
  };

  useEffect(() => {
    setFirstLoad(() => attacker === 0);
    setTime(settings?.timeLimit);
  }, [attacker]);

  return (
    <>
      <CustomModal isOpen={isLeavingGame}>
        <div className="text-black text-center font-semibold flex flex-col gap-4 items-center">
          <span>Are you sure you want to leave the game?</span>
          <div className="flex gap-4">
            <NavLink
              to={"/"}
              onClick={restart}
              className="bg-amber-500 hover:bg-amber-400 duration-200 flex flex-col gap-1 items-center sm-border px-4 py-2"
            >
              YES
            </NavLink>
            <button
              onClick={() => setIsLeavingGame(false)}
              className="hover:bg-gray-200 duration-200 flex flex-col gap-1 items-center sm-border px-4 py-2"
            >
              NO
            </button>
          </div>
        </div>
      </CustomModal>
      <CustomModal isOpen={confirmRestart}>
        <div className="text-black text-center font-semibold flex flex-col gap-4 items-center">
          <span>Are you sure you want to restart the game?</span>
          <div className="flex gap-4">
            <button
              onClick={restart}
              className="bg-amber-500 hover:bg-amber-400 duration-200 flex flex-col gap-1 items-center sm-border px-4 py-2"
            >
              YES
            </button>
            <button
              onClick={() => setConfirmRestart(false)}
              className="hover:bg-gray-200 duration-200 flex flex-col gap-1 items-center sm-border px-4 py-2"
            >
              NO
            </button>
          </div>
        </div>
      </CustomModal>
      <CustomModal isOpen={firstLoad}>
        <div className="text-black text-center font-semibold flex flex-col gap-4 items-center">
          <span>Choose the first player</span>
          <div className="flex gap-4">
            <button
              onClick={() => setAttacker(1)}
              className="hover:bg-gray-200 duration-200 flex flex-col gap-1 items-center sm-border p-4"
            >
              <img src="/yellow-emoji-front.png" alt="yellow emoji" />
              <span>PLAYER 1</span>
            </button>
            <button
              onClick={() => setAttacker(2)}
              className="hover:bg-gray-200 duration-200 flex flex-col gap-1 items-center sm-border p-4"
            >
              <img src="/pink-emoji-front.png" alt="pink emoji" />
              <span>PLAYER 2</span>
            </button>
          </div>
        </div>
      </CustomModal>
      <div className="flex flex-col gap-8 h-full pt-10 pb-28">
        <Controls
          leaveTheGame={() => setIsLeavingGame(true)}
          openConfirmRestart={() => setConfirmRestart(true)}
        />
        <MobileScoreBoard scores={scores} />
        <div className="relative">
          <GameBoard
            discs={discs}
            isVictor={isVictor}
            placeAttack={placeAttack}
            scores={scores}
          />
          <StatusBoard
            attacker={attacker}
            time={time}
            isVictor={isVictor}
            isDraw={isDraw}
            playAgain={playAgain}
          />
        </div>
      </div>
    </>
  );
};

export default Game;
