import axios from "axios";
import { server } from "../../server";

// Get all orders of a user

export const getAllOrdersUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFail",
      payload: error.response.data.message,
    });
  }
};

// Get all orders of a shop

export const getAllOrdersShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersShopRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`
    );

    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersShopFail",
      payload: error.response.data.message,
    });
  }
};

// get All orders admin

export const getAllOrdersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersAdminRequest",
    });

    const response = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllOrdersAdminSuccess",
      payload: response.data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersAdminFail",
      payload: error.response.data.message,
    });
  }
};
