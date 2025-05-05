import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_ERROR,
  REACT_POST,
  GET_REACTS,
  COMMENT_POST,
  SAVE_POST,
  DELETE_POST,
  POST_ERROR,
  UPDATE_POST,
} from '../types/postsTypes';

const initialState = {
  loading: false,
  posts: [],
  error: '',
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POSTS_REQUEST:
      return { ...state, loading: true, error: '' };
    case POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: '',
      };
    case POSTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case REACT_POST:
      return {
        ...state,
        posts: state.posts?.map((post) =>
          post._id === action.payload.postId ? action.payload.data : post,
        ),
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_REACTS:
      return {
        ...state,
        posts: state.posts?.map((post) =>
          post._id === action.payload.postId
            ? { ...post, reacts: action.payload.reacts }
            : post,
        ),
      };

    case COMMENT_POST:
      return {
        ...state,
        posts: state.posts?.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: [...post.comments, action.payload.commentData],
              }
            : post,
        ),
      };

    case SAVE_POST:
      return {
        ...state,
        posts: state.posts?.map((post) =>
          post._id === action.payload.postId
            ? { ...post, saved: action.payload.saved }
            : post,
        ),
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, ...action.payload.post }
            : post,
        ),
      };

    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
