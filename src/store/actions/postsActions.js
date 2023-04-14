import axios from "axios";
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
} from "../types/postsTypes";

export const createPostSuccess = (data) => ({
  type: CREATE_POST_SUCCESS,
  payload: data,
  status: "ok",
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

export const createPost =
  (type, background, text, images, user, token) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/createPost`,
        {
          type,
          background,
          text,
          images,
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(createPostSuccess(res.data));
      return res; // Move return statement after dispatch
    } catch (error) {
      console.log(error); // dodana instrukcja logowania błędu
      dispatch(createPostFailure(error.response.data.message));
    }
  };

export const getAllPosts = (userToken) => async (dispatch) => {
  try {
    dispatch({
      type: POSTS_REQUEST,
    });
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    dispatch({
      type: POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
      payload: error.response?.data?.message,
    });
  }
};

export const reactPost = (postId, react, token) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
      {
        postId,
        react,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: REACT_POST, payload: { postId, data } });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.response.data.message });
  }
};

export const getReacts = (postId, token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getReacts/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: GET_REACTS, payload: { postId, reacts: data } });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.response.data.message });
  }
};

export const commentPost =
  (postId, comment, image, token) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        { postId, comment, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: COMMENT_POST, payload: { postId, commentData: data } });
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.response.data.message });
    }
  };

export const savePost = (postId, token) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/savePost/${postId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: SAVE_POST, payload: { postId, saved: data } });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.response.data.message });
  }
};

export const deletePost = (postId, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/deletePost/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: DELETE_POST, payload: postId });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.response.data.message });
  }
};
