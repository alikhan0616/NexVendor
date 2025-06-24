import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const ordersReducer = createReducer(initialState, (builder) => {
  builder // Get all orders of a user
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }) // Get all orders of a shop
    .addCase("getAllOrdersShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersShopSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }) // Get all orders - Admin
    .addCase("getAllOrdersAdminRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersAdminSuccess", (state, action) => {
      state.isLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase("getAllOrdersAdminFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
