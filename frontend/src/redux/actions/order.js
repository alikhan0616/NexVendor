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
