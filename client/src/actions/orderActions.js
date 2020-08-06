import {
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  PLACE_ORDER_ERROR,
  PLACE_ORDER_SUCCESS,
  CANCEL_ORDER_ERROR,
  CANCEL_ORDER_SUCCESS,
  CLEAR_TOASTS,
} from "./types";
import axios from "axios";

// Get a list of all orders
export const getOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/orders",
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });

      setTimeout(() => {
        dispatch({ type: CLEAR_TOASTS });
      }, 8000);
    } catch (error) {
      dispatch({
        type: GET_ORDERS_ERROR,
        payload:
          "Failed to get list of orders. Please refresh the page and try again.",
      });

      setTimeout(() => {
        dispatch({ type: CLEAR_TOASTS });
      }, 8000);
    }
  };
};

// Place a new order
export const placeOrder = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/orders",
        headers: { "x-auth-token": localStorage.getItem("token") },
        data: formData,
      });

      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: "Your order has been placed successfully.",
      });

      dispatch(getOrders());
    } catch (error) {
      dispatch({
        type: PLACE_ORDER_ERROR,
        payload: "Failed to place the order. Please try again.",
      });

      setTimeout(() => {
        dispatch({ type: CLEAR_TOASTS });
      }, 8000);
    }
  };
};

// Cancel an order
export const cancelOrder = (orderID) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "patch",
        url: `/api/orders/${orderID}`,
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      dispatch({
        type: CANCEL_ORDER_SUCCESS,
        payload: "Your order has been cancelled.",
      });

      dispatch(getOrders());
    } catch (error) {
      dispatch({
        type: CANCEL_ORDER_ERROR,
        payload: "Failed to cancel your order. Please try again.",
      });

      setTimeout(() => {
        dispatch({ type: CLEAR_TOASTS });
      }, 8000);
    }
  };
};