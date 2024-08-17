import { useEffect, useState } from "react";

const useTimer = (initialTime, onTimeUp) => {
  const [time, setTime] = useState(initialTime);

  // useEffect(() => {
  //   if (time <= 0) {
  //     onTimeUp();
  //     setTime(initialTime);
  //     return;
  //   }

  //   const intervalId = setInterval(() => setTime(time - 1), 1000);
  //   return () => clearInterval(intervalId);
  // }, [time, initialTime, onTimeUp]);

  return { time, setTime };
};

export default useTimer;
