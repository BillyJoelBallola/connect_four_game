import { createContext, useState } from "react";

// TODO:
// [x] theme
// [x] resetBoard

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
    const defaultBoardSize = defaultBoard[settings.boardSize.code];

    setSettings((current) => {
      return {
        ...current,
        boardSize: {
          ...current.boardSize,
          size: defaultBoardSize,
        },
      };
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        changeBorderSize,
        changeTimeLimit,
        resetSettings,
        resetBoard,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
