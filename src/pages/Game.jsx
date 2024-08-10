import React, { useEffect, useState } from "react";
import Controls from "../components/Controls";
import MobileScoreBoard from "../components/MobileScoreBoard";
import StatusBoard from "../components/StatusBoard";
import GameBoard from "../components/GameBoard";
import CustomModal from "../components/CustomModal";
import { NavLink } from "react-router-dom";

// TODO:
// [/] winner
// [/] scoring
// [/] play again
// [x] diagonal checking
// [x] pause?
// [x] settings?

const Game = () => {
  const [scores, setScores] = useState({
    playerOne: 0,
    playerTwo: 0,
  });
  const [attacker, setAttacker] = useState(0);
  const [isVictor, setIsVictor] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [isLeavingGame, setIsLeavingGame] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [timer, setTimer] = useState(30);
  const [circles, setCircles] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  const resetBoard = () => {
    setCircles([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
  };

  const restart = () => {
    setScores({ playerOne: 0, playerTwo: 0 });
    setFirstLoad(true);
    setConfirmRestart(false);
    setAttacker(0);
    resetBoard();
  };

  const switchAttacker = () => {
    setAttacker((current) => (current === 1 ? 2 : 1));
  };

  const isWinner = (arr, rowIdx, colIdx) => {
    const row = arr[rowIdx];

    const checkHorizontal = (startCol, direction) => {
      let count = 0;

      for (let col = startCol; col >= 0 && col < row.length; col += direction) {
        if (row[col] === attacker) {
          count++;
          if (count === 4) {
            setIsVictor(true);
            return true;
          }
        } else {
          break;
        }
      }
      return false;
    };

    const checkTop = (startRow, col) => {
      let count = 0;

      for (let row = startRow; row >= 0 && row < arr.length; row += 1) {
        if (arr[row][col] === attacker) {
          count++;
          if (count === 4) {
            setIsVictor(true);
            return true;
          }
        } else {
          break;
        }
      }
      return false;
    };

    const checKDraw = () => {
      if (rowIdx !== 0) return;

      const firstLayer = arr[0];
      const isThereZero = firstLayer.filter((item) => item === 0);

      if (isThereZero.length === 0) {
        return true;
      } else {
        return false;
      }
    };

    if (checKDraw()) {
      setIsDraw(true);
      return;
    }

    // left
    if (checkHorizontal(colIdx, -1)) {
      const victor = attacker === 1 ? "playerOne" : "playerTwo";
      setScores((current) => ({
        ...current,
        [victor]: current[victor] + 1,
      }));
      return;
    }

    // right
    if (checkHorizontal(colIdx, 1)) {
      const victor = attacker === 1 ? "playerOne" : "playerTwo";
      setScores((current) => ({
        ...current,
        [victor]: current[victor] + 1,
      }));
      return;
    }

    // top
    if (checkTop(rowIdx, colIdx)) {
      const victor = attacker === 1 ? "playerOne" : "playerTwo";
      setScores((current) => ({
        ...current,
        [victor]: current[victor] + 1,
      }));
      return;
    }
  };

  const placeAttack = (colIdx) => {
    const newCircles = [...circles];
    let rowIdx = 0;

    const placingAttack = (arr, colIdx, level) => {
      if (level > 6) return;

      if (arr[arr.length - level][colIdx] === 0) {
        arr[arr.length - level][colIdx] = attacker;
        rowIdx = arr.findIndex((item) => item === arr[arr.length - level]);
      } else {
        placingAttack(arr, colIdx, level + 1);
      }
    };

    setCircles(newCircles);
    placingAttack(newCircles, colIdx, 1);
    isWinner(newCircles, rowIdx, colIdx);
    switchAttacker();
    setTimer(30);
  };

  const playAgain = () => {
    resetBoard();
    setIsVictor(false);
    setIsDraw(false);
  };

  useEffect(() => {
    if (attacker === 0 || isVictor || isDraw) return;

    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer((current) => current - 1);
      } else {
        switchAttacker();
        setTimer(30);
      }
    }, [1000]);

    return () => clearInterval(intervalId);
  }, [timer, attacker, isVictor, isDraw]);

  useEffect(() => {
    setFirstLoad(() => attacker === 0);
    setTimer(30);
  }, [attacker]);

  return (
    <>
      {isLeavingGame && (
        <CustomModal>
          <div className="text-black font-semibold flex flex-col gap-4 items-center">
            <span>Are you sure you want to leave the game?</span>
            <div className="flex gap-4">
              <NavLink
                to={"/"}
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
      )}
      {confirmRestart && (
        <CustomModal>
          <div className="text-black font-semibold flex flex-col gap-4 items-center">
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
      )}
      {firstLoad && (
        <CustomModal>
          <div className="text-black font-semibold flex flex-col gap-4 items-center">
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
      )}
      <div className="flex flex-col gap-8 h-full pt-10 pb-28">
        <Controls
          leaveTheGame={() => setIsLeavingGame(true)}
          openConfirmRestart={() => setConfirmRestart(true)}
        />
        <MobileScoreBoard scores={scores} />
        <div className="flex items-center justify-around relative">
          <div className="relative p-4 pt-6 sm-border hidden md:flex flex-col items-center font-semibold bg-white text-black">
            <img
              src="/yellow-emoji.png"
              alt="emoji"
              className="w-10 absolute -top-6"
            />
            <span>PLAYER 1</span>
            <span className="text-[3.5rem] -m-4">{scores.playerOne}</span>
          </div>
          <GameBoard
            circles={circles}
            isVictor={isVictor}
            placeAttack={placeAttack}
          />
          <div className="relative p-4 pt-6 sm-border hidden md:flex flex-col items-center font-semibold bg-white text-black">
            <img
              src="/pink-emoji.png"
              alt="emoji"
              className="w-10 absolute -top-6"
            />
            <span>PLAYER 2</span>
            <span className="text-[3.5rem] -m-4">{scores.playerTwo}</span>
          </div>
          <StatusBoard
            attacker={attacker}
            timer={timer}
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
