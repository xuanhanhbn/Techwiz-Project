import { useState, useEffect } from "react";

export default function (second) {
  const [countdown, setCountdown] = useState(second);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (isCounting) {
      let interval = setInterval(() => {
        setCountdown((preSecond) => {
          preSecond <= 1 && clearInterval(interval);
          return preSecond - 1;
        });
      }, 1000);
      return () => {
        clearInterval(interval);
        setIsCounting(false);
      };
    }
  }, [isCounting]);

  function startCountdown() {
    setIsCounting(true);
  }

  function stopCountdown() {
    setIsCounting(false);
  }

  function resetCountdown() {
    setCountdown(second);
  }

  return { countdown, startCountdown, stopCountdown, resetCountdown };
}
