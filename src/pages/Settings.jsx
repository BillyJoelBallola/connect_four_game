import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { NavLink } from "react-router-dom";

const boardSizeInput = ["small", "medium", "large"];

const Settings = () => {
  const { settings, changeTimeLimit, changeBorderSize, resetSettings } =
    useContext(SettingsContext);

  return (
    <div className="grid place-items-center h-screen">
      <div className="relative grid gap-8 lg-border-white text-black bg-white p-4 pb-8 md:p-8 md:pb-12 md:w-[500px] w-[90%]">
        <h1 className="text-center text-[3rem] md:text-[3.4rem] font-semibold">
          SETTINGS
        </h1>
        <div className="grid gap-2">
          <h2 className="text-xl font-semibold text-violet-600">TIME LIMIT</h2>
          <input
            type="range"
            min={10}
            max={30}
            step={5}
            value={settings?.timeLimit}
            onChange={changeTimeLimit}
            className="cursor-pointer rounded-lg appearance-none bg-gray-200 range-sm"
          />
          <div className="mt-2 text-center text-lg font-semibold text-gray-800">
            Limit: {settings?.timeLimit}
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="text-xl font-semibold text-violet-600">BOARD SIZE</h2>
          <div className="flex items-center justify-between mb-2 text-lg font-semibold">
            {boardSizeInput.map((item, idx) => (
              <div key={idx}>
                <label
                  htmlFor={item}
                  className={`cursor-pointer capitalize ${
                    settings?.boardSize?.code === item
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                >
                  {item}
                </label>
                <input
                  type="radio"
                  value={item}
                  onChange={changeBorderSize}
                  name="boardSize"
                  id={item}
                  hidden
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-8">
          <NavLink
            to={"/"}
            className="bg-amber-500 hover:bg-amber-400 duration-200 flex flex-col gap-1 items-center sm-border px-4 py-2"
          >
            Done
          </NavLink>
          <button
            onClick={resetSettings}
            className="hover:bg-gray-200 duration-200 flex flex-col gap-1 items-center sm-border px-4 py-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
