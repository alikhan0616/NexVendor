import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder // Create a event
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    }) // Get all events of a shop
    .addCase("getAllEventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase("getAllEventsShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }) // Delete event of a shop
    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteEventFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }) // Get all events
    .addCase("getAllEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase("getAllEventsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
