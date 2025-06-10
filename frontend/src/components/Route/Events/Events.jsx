import React, { useEffect } from "react";
import styles from "../../../styles/styles";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Layout/Loader";
import { getAllEvents } from "../../../redux/actions/event";
const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    const data = allEvents && allEvents.find((a, b) => a.sold_out - b.sold_out);
  }, [allEvents]);

  return (
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Products</h1>
          </div>
          <div className="w-full grid ">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
