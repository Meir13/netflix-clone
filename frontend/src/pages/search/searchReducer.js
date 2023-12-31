import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../services/actionTypes";

export const searchPageInitialState = {
  isLoading: true,
  content: [],
  error: "",
};

export const searchReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, isLoading: true };
    case GET_SUCCESS:
      return { ...state, content: payload, isLoading: false };
    case GET_FAIL:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
