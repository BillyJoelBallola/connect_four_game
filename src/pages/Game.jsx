import React, { useEffect, useState } from "react";
import Controls from "../components/Controls";
import MobileScoreBoard from "../components/MobileScoreBoard";
import TimerBoard from "../components/TimerBoard";
import GameBoard from "../components/GameBoard";

// before entering the game, players will choice who's going to attack first and make in play again also

// TODO:
// [x] winner
// [x] scoring
// [x] play again
// [x] pause?
// [x] settings?

const Game = () => {
  const [scores, setScores] = useState({
    playerOne: 0,
    playerTwo: 0,
  });
  const [attacker, setAttacker] = useState(1);
  const [isVictor, setIsVictor] = useState(true);
  const [timer, setTimer] = useState(30);
  const [circles, setCircles] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  const switchAttacker = () => {
    setAttacker((current) => (current === 1 ? 2 : 1));
  };

  const isWinner = (arr, rowIdx, colIdx) => {
    const subArr = arr[rowIdx];
    let count = 0;

    // for (let i = colIdx; i > 0; i--) {
    // if (i === 2) return;
    // console.log(subArr[i]);
    // if (subArr[i] === 1) {
    //   count += 1;
    // }
    // if (count === 4) {
    //   return console.log("winner p1");
    // }
    // }
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

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (timer > 0) {
  //       setTimer((current) => current - 1);
  //     } else {
  //       switchAttacker();
  //       setTimer(30);
  //     }
  //   }, [1000]);

  //   return () => clearInterval(intervalId);
  // }, [timer, attacker]);

  return (
    <div className="flex flex-col gap-8 relative h-full pt-10 pb-28">
      <Controls setCircles={setCircles} />
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
        <GameBoard circles={circles} placeAttack={placeAttack} />
        <div className="relative p-4 pt-6 sm-border hidden md:flex flex-col items-center font-semibold bg-white text-black">
          <img
            src="/pink-emoji.png"
            alt="emoji"
            className="w-10 absolute -top-6"
          />
          <span>PLAYER 2</span>
          <span className="text-[3.5rem] -m-4">{scores.playerTwo}</span>
        </div>
        <TimerBoard attacker={attacker} timer={timer} />
      </div>
    </div>
  );
};

export default Game;
