import axios from 'axios';
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

export const createPostSuccess = (data) => ({
  type: CREATE_POST_SUCCESS,
  payload: data,
  status: 'ok',
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
        },
      );

      dispatch(createPostSuccess(res?.data));
      return res; // Move return statement after dispatch
    } catch (error) {
      console.log(error); // dodana instrukcja logowania błędu
      dispatch(createPostFailure(error.response?.data?.message));
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
      },
    );
    dispatch({
      type: POSTS_SUCCESS,
      payload: res?.data,
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
    if (!token) {
      console.error('Brak tokena autoryzacji w reactPost');
      return null;
    }

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
      },
    );
    dispatch({ type: REACT_POST, payload: { postId, data } });
    return data;
  } catch (error) {
    console.error('Błąd w reactPost:', error);
    dispatch({
      type: POST_ERROR,
      payload: error.response?.data?.message || 'Błąd podczas reakcji na post',
    });
    return null;
  }
};

export const getReacts = (postId, token) => async (dispatch) => {
  try {
    if (!token) {
      console.error('Brak tokena autoryzacji w getReacts');
      return null;
    }

    if (!postId) {
      console.error('Brak ID posta w getReacts');
      return null;
    }

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getReacts/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    dispatch({ type: GET_REACTS, payload: { postId, reacts: data } });
    return data;
  } catch (error) {
    console.error('Błąd w getReacts:', error);
    dispatch({
      type: POST_ERROR,
      payload:
        error.response?.data?.message || 'Błąd podczas pobierania reakcji',
    });
    return null;
  }
};

export const commentPost =
  (postId, comment, image, token) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        { postId, comment, image },
        { headers: { Authorization: `Bearer ${token}` } },
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
      { headers: { Authorization: `Bearer ${token}` } },
    );
    dispatch({ type: SAVE_POST, payload: { postId, saved: data } });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.response.data.message });
  }
};

export const deletePost = (postId, token) => async (dispatch) => {
  try {
    console.log('🔍 [deletePost] Rozpoczęcie usuwania posta:', { postId });

    if (!postId) {
      console.error('❌ [deletePost] Brak ID posta!');
      return { status: 'error', message: 'Brak ID posta' };
    }

    if (!token) {
      console.error('❌ [deletePost] Brak tokena autoryzacji!');
      return { status: 'error', message: 'Brak tokena' };
    }

    console.log('🔄 [deletePost] Wysyłanie żądania do API...');
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/deletePost/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    console.log('✅ [deletePost] Odpowiedź API:', data);
    dispatch({ type: DELETE_POST, payload: postId });
    return { status: 'ok', data };
  } catch (error) {
    console.error(
      '❌ [deletePost] Błąd podczas usuwania posta:',
      error.message,
    );
    console.error('❌ [deletePost] Pełny błąd:', error);
    dispatch({
      type: POST_ERROR,
      payload: error.response?.data?.message || 'Błąd podczas usuwania posta',
    });
    return {
      status: 'error',
      message: error.message || 'Nieznany błąd podczas usuwania posta',
    };
  }
};

export const updatePost = (postId, postData, token) => async (dispatch) => {
  try {
    console.log('🔍 [updatePost] Rozpoczęcie aktualizacji posta:', {
      postId,
      text: postData.text,
      hasBackground: !!postData.background,
      hasImages: postData.images && postData.images.length,
    });

    if (!postId) {
      console.error('❌ [updatePost] Brak ID posta!');
      return { status: 'error', message: 'Brak ID posta' };
    }

    if (!token) {
      console.error('❌ [updatePost] Brak tokena autoryzacji!');
      return { status: 'error', message: 'Brak tokena' };
    }

    console.log('🔄 [updatePost] Wysyłanie żądania do API...');
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updatePost/${postId}`,
      postData,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    console.log('✅ [updatePost] Odpowiedź API:', data);
    dispatch({ type: UPDATE_POST, payload: { postId, post: data } });
    return { status: 'ok', data };
  } catch (error) {
    console.error(
      '❌ [updatePost] Błąd podczas aktualizacji posta:',
      error.message,
    );
    console.error('❌ [updatePost] Pełny błąd:', error);
    dispatch({
      type: POST_ERROR,
      payload:
        error.response?.data?.message || 'Nieznany błąd podczas aktualizacji',
    });
    return {
      status: 'error',
      message: error.message || 'Nieznany błąd podczas aktualizacji posta',
    };
  }
};
