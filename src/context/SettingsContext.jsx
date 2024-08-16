import { createContext, useState } from "react";

const defaultBoardSize = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const initialState = {
  timeLimit: 30,
  boardSize: {
    code: "default",
    size: defaultBoardSize,
  },
};

export const SettingsContext = createContext(initialState);

export const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialState);

  const changeBorderSize = (size) => {
    switch (size) {
      case "small":
        setSettings((current) => ({
          ...current,
          boardSize: {
            code: "small",
            size: [
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
            ],
          },
        }));
      case "medium":
        setSettings((current) => ({
          ...current,
          boardSize: {
            code: "medium",
            size: [
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
            ],
          },
        }));
      case "default":
        setSettings((current) => ({
          ...current,
          boardSize: {
            code: "default",
            size: defaultBoardSize,
          },
        }));
    }
  };

  const changeTimeLimit = (time) => {
    setSettings((current) => ({ ...current, timeLimit: time }));
  };

  const resetSettings = () => {
    setSettings(initialState);
  };

  return (
    <SettingsContext.Provider
      value={{ settings, changeBorderSize, changeTimeLimit, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
