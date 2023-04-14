// actions/friendsActions.js
import axios from "axios";
import {
  FRIENDS_REQUEST,
  FRIENDS_SUCCESS,
  FRIENDS_ERROR,
} from "../types/friendsTypes";

export const friendsRequest = () => ({
  type: FRIENDS_REQUEST,
});

export const friendsSuccess = (payload) => ({
  type: FRIENDS_SUCCESS,
  payload,
});

export const friendsError = (payload) => ({
  type: FRIENDS_ERROR,
  payload,
});

export const getFriendsPageInfos = (token) => async (dispatch) => {
  dispatch(friendsRequest());
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getFriendsPageInfos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(friendsSuccess(data));
  } catch (error) {
    dispatch(friendsError(error.response?.data?.message || "Error"));
  }
};
