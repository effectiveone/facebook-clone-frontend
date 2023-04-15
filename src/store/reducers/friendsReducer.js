// reducers/friendsReducer.js

import {
  FRIENDS_REQUEST,
  FRIENDS_SUCCESS,
  FRIENDS_ERROR,
} from "../types/friendsTypes";
import { friendsActions } from "../actions/friendsActions";

const initialState = {
  loading: false,
  data: {},
  error: "",
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case FRIENDS_REQUEST:
      return { ...state, loading: true, error: "" };
    case FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case FRIENDS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case friendsActions.SET_PENDING_FRIENDS_INVITATIONS:
      return {
        ...state,
        pendingFriendsInvitations: action.pendingFriendsInvitations,
      };
    case friendsActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case friendsActions.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    default:
      return state;
  }
}
