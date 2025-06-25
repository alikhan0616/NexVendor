import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    }) // Update user info
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase("updateUserInfoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }) // Add/Update user addresses
    .addCase("updateUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.user = action.payload;
    })
    .addCase("updateUserAddressFail", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    }) // Remove an address
    .addCase("removeUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("removeUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.user = action.payload;
    })
    .addCase("removeUserAddressFail", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })
    .addCase("GetUsersAdminRequest", (state) => {
      state.usersLoading = true;
    })
    .addCase("GetUsersAdminSuccess", (state, action) => {
      state.usersLoading = false;
      state.adminUsers = action.payload;
    })
    .addCase("GetUsersAdminFail", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
