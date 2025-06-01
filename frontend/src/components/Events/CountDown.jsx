import React, { useEffect, useState } from "react";

const CountDown = () => {
  const [timeleft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  function calculateTimeLeft() {
    const difference = +new Date("2025-07-01") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }
  const timerComponents = Object.keys(timeleft).map((interval) => {
    if (!timeleft[interval]) {
      return null;
    }
    return (
      <span className="text-2xl text-indigo-600 ">
        {" " + timeleft[interval]} {interval}
      </span>
    );
  });

  return (
    <div className="">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red-600 text-2xl">Time's up!</span>
      )}
    </div>
  );
};

export default CountDown;
