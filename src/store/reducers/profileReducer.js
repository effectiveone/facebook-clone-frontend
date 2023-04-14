import * as types from "../types/profileTypes";

export const initialState = {
  loading: false,
  profile: {
    posts: [],
  },
  error: "",
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_REQUEST:
      return { ...state, loading: true, error: "" };
    case types.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: "",
      };
    case types.PROFILE_POSTS:
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, posts: action.payload },
        error: "",
      };
    case types.PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
