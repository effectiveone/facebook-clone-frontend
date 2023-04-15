// actions/friendsActions.js
import axios from "axios";
import {
  FRIENDS_REQUEST,
  FRIENDS_SUCCESS,
  FRIENDS_ERROR,
} from "../types/friendsTypes";
import * as api from "../../api";
import { openAlertMessage } from "./alertActions";

export const friendsActions = {
  SET_FRIENDS: "FRIENDS.SET_FRIENDS",
  SET_PENDING_FRIENDS_INVITATIONS: "FRIENDS.SET_PENDING_FRIENDS_INVITATIONS",
  SET_ONLINE_USERS: "FRIENDS.SET_ONLINE_USERS",
};

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

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) =>
      dispatch(sendFriendInvitation(data, closeDialogHandler)),
    acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
    rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data)),
  };
};

export const setPendingFriendsInvitations = (pendingFriendsInvitations) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
    pendingFriendsInvitations,
  };
};

export const setFriends = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    friends,
  };
};

export const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendsActions.SET_ONLINE_USERS,
    onlineUsers,
  };
};

const sendFriendInvitation = (data) => {
  console.log("sendFriendInvitation", data);
  return async (dispatch) => {
    const response = await api.sendFriendInvitation(data);

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation has been sent!"));
    }
  };
};

const acceptFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.acceptFriendInvitation(data);

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation accepted!"));
    }
  };
};

const rejectFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.rejectFriendInvitation(data);

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation rejected!"));
    }
  };
};

export { sendFriendInvitation, acceptFriendInvitation, rejectFriendInvitation };
