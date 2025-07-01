import React, { useEffect } from "react";
import styles from "../../../styles/styles";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Layout/Loader";
import { getAllEvents } from "../../../redux/actions/event";
const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Products</h1>
          </div>
          {allEvents.length !== 0 && (
            <div className="w-full grid ">
              <EventCard data={allEvents && allEvents[0]} />
            </div>
          )}
          {allEvents?.length === 0 && (
            <h1 className="my-5 text-center font-semibold text-2xl text-orange-600">
              No Running Events!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
