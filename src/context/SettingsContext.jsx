import { createContext, useEffect, useState } from "react";

// TODO:
// [x] theme

const defaultBoard = {
  small: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  medium: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  large: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
};

const initialState = {
  timeLimit: 30,
  boardSize: {
    code: "large",
    size: defaultBoard["large"],
  },
};

export const SettingsContext = createContext(initialState);

export const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialState);
  const [update, setUpdate] = useState(false);

  const changeBorderSize = (e) => {
    const selectedSize = e.target.value;

    if (selectedSize === "small") {
      setSettings((current) => ({
        ...current,
        boardSize: {
          code: "small",
          size: defaultBoard["small"],
        },
      }));
    }

    if (selectedSize === "medium") {
      setSettings((current) => ({
        ...current,
        boardSize: {
          code: "medium",
          size: defaultBoard["medium"],
        },
      }));
    }

    if (selectedSize === "large") {
      setSettings((current) => ({
        ...current,
        boardSize: {
          code: "large",
          size: defaultBoard["large"],
        },
      }));
    }
  };

  const changeTimeLimit = (e) => {
    setSettings((current) => ({
      ...current,
      timeLimit: Number(e.target.value),
    }));
  };

  const resetSettings = () => {
    setSettings(initialState);
  };

  const resetBoard = () => {
    const activeBoard = defaultBoard[settings.boardSize.code];
    let newBoard = [];

    for (let subArr of activeBoard) {
      if (newBoard.length >= activeBoard.length) return;
      newBoard.push(Array(subArr.length).fill(0));
    }

    setSettings((current) => ({
      ...current,
      boardSize: {
        ...current.boardSize,
        size: newBoard,
      },
    }));

    setUpdate(true);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        changeBorderSize,
        changeTimeLimit,
        resetSettings,
        resetBoard,
        update,
        setUpdate,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
