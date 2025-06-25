import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

// load user

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// load seller

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getseller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

// User Update Inofrmation

export const updateUserInfo =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
      toast.success(data.message);
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response.data.message,
      });
    }
  };

// update user address
export const updateUserAddress =
  (country, city, address1, address2, addressType, zipCode) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-address`,
        {
          country,
          city,
          address1,
          address2,
          addressType,
          zipCode,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: data.user,
      });
      toast.success(data.message);
    } catch (error) {
      dispatch({
        type: "updateUserAddressFail",
        payload: error.message,
      });
    }
  };

// Delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "removeUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "removeUserAddressSuccess",
      payload: data.user,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "removeUserAddressFail",
      payload: error.message,
    });
  }
};

// get All sellers admin

export const getAllSellersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "AdminGetSellersRequest",
    });

    const response = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "AdminGetSellersSuccess",
      payload: response.data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "AdminGetSellersFail",
      payload: error.response.data.message,
    });
  }
};

// get All sellers admin

export const getAllUsersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetUsersAdminRequest",
    });

    const response = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetUsersAdminSuccess",
      payload: response.data.users,
    });
  } catch (error) {
    dispatch({
      type: "GetUsersAdminFail",
      payload: error.response.data.message,
    });
  }
};
