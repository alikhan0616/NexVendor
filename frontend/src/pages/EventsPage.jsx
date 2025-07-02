import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Route/Events/EventCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeHeading={4} />
          {allEvents &&
            allEvents.map((i, index) => (
              <EventCard active={true} data={i} key={index} />
            ))}
          {allEvents?.length === 0 && (
            <h1 className="mt-20 text-center font-semibold text-2xl text-orange-600">
              No Running Events!
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default EventsPage;
