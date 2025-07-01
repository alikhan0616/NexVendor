import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../server";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../../redux/actions/event";

const CountDown = ({ data }) => {
  const [timeleft, setTimeLeft] = useState(calculateTimeLeft());

  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    if (
      typeof timeleft.days === "undefined" &&
      typeof timeleft.hours === "undefined" &&
      typeof timeleft.minutes === "undefined" &&
      typeof timeleft.seconds === "undefined"
    ) {
      deleteEvent();
    }
    return () => clearTimeout(timer);
  });

  async function deleteEvent() {
    await axios
      .delete(`${server}/event/delete-shop-event/${data._id}`)
      .then((res) => {
        dispatch(getAllEvents());
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }
  function calculateTimeLeft() {
    const difference = +new Date(data.finish_Date) - +new Date();
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
      <span key={interval} className="text-2xl text-indigo-600 ">
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
