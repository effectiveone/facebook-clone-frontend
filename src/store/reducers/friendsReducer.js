// reducers/friendsReducer.js

import {
  FRIENDS_REQUEST,
  FRIENDS_SUCCESS,
  FRIENDS_ERROR,
} from "../types/friendsTypes";

const initialState = {
  loading: false,
  data: {},
  error: "",
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

    default:
      return state;
  }
}
