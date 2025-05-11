import * as types from '../types/profileTypes';

export const initialState = {
  loading: false,
  profile: {
    posts: [],
  },
  error: '',
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_REQUEST:
      console.log('PROFILE_REQUEST - Rozpoczynam pobieranie profilu');
      return { ...state, loading: true, error: '' };
    case types.PROFILE_SUCCESS:
      console.log('PROFILE_SUCCESS - Otrzymano dane profilu:', action.payload);
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: '',
      };
    case types.PROFILE_POSTS:
      console.log('PROFILE_POSTS - Aktualizacja postów:', action.payload);
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, posts: action.payload },
        error: '',
      };
    case types.PROFILE_ERROR:
      console.error('PROFILE_ERROR - Błąd:', action.payload);
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
