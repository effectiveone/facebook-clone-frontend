import axios from "axios";
import * as types from "../types/profileTypes";

export const getProfile = (userName) => async (dispatch) => {
  try {
    dispatch({ type: types.PROFILE_REQUEST });
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`
    );

    dispatch({
      type: types.PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: error.response?.data?.message || "Something went wrong.",
    });
  }
};

export * from "../types/profileTypes";
