import React, { useEffect, useState } from "react";
import Controls from "../components/Controls";
import MobileScoreBoard from "../components/MobileScoreBoard";
import TimerBoard from "../components/TimerBoard";
import GameBoard from "../components/GameBoard";
import CustomModal from "../components/CustomModal";

// before entering the game, players will choice who's going to attack first and make in play again also

// TODO:
// [/] winner
// [/] scoring
// [/] play again
// [x] pause?
// [x] settings?

const Game = () => {
  const [scores, setScores] = useState({
    playerOne: 0,
    playerTwo: 0,
  });
  const [attacker, setAttacker] = useState(1);
  const [isVictor, setIsVictor] = useState(false);
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

  const restart = () => {
    setCircles([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
  };

  const switchAttacker = () => {
    setAttacker((current) => (current === 1 ? 2 : 1));
  };

  const isWinner = (arr, rowIdx, colIdx) => {
    const row = arr[rowIdx];

    const checkX = (startCol, direction) => {
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

    const checkY = (startRow, col) => {
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

    const checKTie = () => {
      if (rowIdx !== 0) return;

      const firstLayer = arr[0];
      const isThereZero = firstLayer.filter((item) => item === 0);

      if (isThereZero.length === 0) {
        return true;
      } else {
        return false;
      }
    };

    if (checKTie()) {
      setIsDraw(true);
      return;
    }

    // left
    if (checkX(colIdx, -1)) {
      const victor = attacker === 1 ? "playerOne" : "playerTwo";
      setScores((current) => ({
        ...current,
        [victor]: current[victor] + 1,
      }));
      return;
    }

    // right
    if (checkX(colIdx, 1)) {
      const victor = attacker === 1 ? "playerOne" : "playerTwo";
      setScores((current) => ({
        ...current,
        [victor]: current[victor] + 1,
      }));
      return;
    }

    // top
    if (checkY(rowIdx, colIdx)) {
      const victor = attacker === 1 ? "playerOne" : "playerTwo";
      setScores((current) => ({
        ...current,
        [victor]: current[victor] + 1,
      }));
      return;
    }
  };

  const placeAttack = (colIdx) => {
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

    const newCircles = [...circles];
    placingAttack(newCircles, colIdx, 1);
    setCircles(newCircles);
    isWinner(newCircles, rowIdx, colIdx);
    switchAttacker();
    setTimer(30);
  };

  const playAgain = () => {
    restart();
    setIsVictor(false);
    setIsDraw(false);
    setTimer(30);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer((current) => current - 1);
      } else {
        switchAttacker();
        setTimer(30);
      }
    }, [1000]);

    return () => clearInterval(intervalId);
  }, [timer, attacker]);

  return (
    <div className="flex flex-col gap-8 relative h-full pt-10 pb-28">
      {/* <CustomModal>
        <div className="text-black flex flex-col text-center">
          <span>PLAYER {attacker}</span>
          <span>WINS</span>
        </div>
      </CustomModal> */}
      <Controls restart={restart} />
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
        <TimerBoard
          attacker={attacker}
          timer={timer}
          isVictor={isVictor}
          isDraw={isDraw}
          playAgain={playAgain}
        />
      </div>
    </div>
  );
};

export default Game;
