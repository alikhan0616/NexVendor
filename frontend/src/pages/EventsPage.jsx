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
        </>
      )}
    </div>
  );
};

export default EventsPage;
