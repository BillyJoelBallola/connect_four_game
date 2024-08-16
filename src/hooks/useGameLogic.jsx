import { useState } from "react";

const useGameLogic = (initialDiscs, initialScores) => {
  const [discs, setDiscs] = useState(initialDiscs);
  const [scores, setScores] = useState(initialScores);
  const [attacker, setAttacker] = useState(0);
  const [isVictor, setIsVictor] = useState(false);
  const [isDraw, setIsDraw] = useState(false);

  const switchAttacker = () => setAttacker((prev) => (prev === 1 ? 2 : 1));

  const generateScore = () => {
    const victor = attacker === 1 ? "playerOne" : "playerTwo";
    setScores((prev) => ({
      ...prev,
      [victor]: prev[victor] + 1,
    }));
  };

  const resetBoard = () => setDiscs(initialDiscs);

  const isWinner = (arr, rowIdx, colIdx) => {
    const row = arr[rowIdx];

    // helpers
    const checkDiagonal = (startRow, startCol, direction) => {
      let count = 0;
      let row = startRow;
      let col = startCol;

      // Check the main diagonal direction
      while (row >= 0 && row < arr.length && col >= 0 && col < arr[0].length) {
        if (arr[row][col] === attacker) {
          count++;
          if (count === 4) {
            setIsVictor(true);
            return true;
          }
        } else {
          break; // If we encounter a non-attacker piece, we stop checking
        }

        // Move to the next cell in the specified diagonal direction
        row++;
        col += direction;
      }

      // Check the opposite diagonal direction
      row = startRow - 1;
      col = startCol - direction;

      while (row >= 0 && row < arr.length && col >= 0 && col < arr[0].length) {
        if (arr[row][col] === attacker) {
          count++;
          if (count === 4) {
            setIsVictor(true);
            return true;
          }
        } else {
          break; // If we encounter a non-attacker piece, we stop checking
        }

        // Move to the next cell in the opposite diagonal direction
        row--;
        col -= direction;
      }

      return false;
    };

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

    // usage
    if (checkDiagonal(rowIdx, colIdx, 1)) {
      generateScore();
      return;
    }

    if (checkDiagonal(rowIdx, colIdx, -1)) {
      generateScore();
      return;
    }

    if (checKDraw()) {
      setIsDraw(true);
      return;
    }

    if (checkHorizontal(colIdx, -1)) {
      generateScore();
      return;
    }

    if (checkHorizontal(colIdx, 1)) {
      generateScore();
      return;
    }

    if (checkTop(rowIdx, colIdx)) {
      generateScore();
      return;
    }
  };

  const placeAttack = (colIdx) => {
    const newDiscs = [...discs];
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

    setDiscs(newDiscs);
    placingAttack(newDiscs, colIdx, 1);
    isWinner(newDiscs, rowIdx, colIdx);
    switchAttacker();
  };

  return {
    discs,
    scores,
    attacker,
    isVictor,
    isDraw,
    placeAttack,
    resetBoard,
    generateScore,
    switchAttacker,
    setAttacker,
    setScores,
    setIsVictor,
    setIsDraw,
  };
};

export default useGameLogic;
