import axios from "axios";
import { setError, setLoading, setUser } from "./authActions";

export const loginCall = async (userCredentials, dispatch) => {
  try {
    dispatch(setLoading());

    const res = await axios.post("/users/signin", userCredentials);
    dispatch(res.data ? setUser(res.data) : setError());
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

export const signUpCall = async (newUser, dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post("/users/signup", {
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
      //add profile picture
      // profilePicture: newUser.profilePicture
    });
    dispatch(res.data ? setUser(res.data) : setError());
  } catch (error) {
    dispatch(setError());
  }
};
