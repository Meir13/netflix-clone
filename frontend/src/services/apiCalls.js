import axios from "axios";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "./actionTypes";

export const contentCall = async (dispatch, type) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    dispatch({ type: GET_REQUEST });

    const res = await axios.get(`/content/lists`, {
      params: { type },
      headers: {
        authorization: user.token,
      },
    });
    dispatch({ type: GET_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_FAIL, payload: error });
    console.log("content:" + error);
  }
};
