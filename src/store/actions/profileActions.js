import axios from "axios";
import * as types from "../types/profileTypes";

export const getProfile =
  (userName, token, navigate, path, sort, max, setPhotos) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.PROFILE_REQUEST });
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: types.PROFILE_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: types.PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export * from "../types/profileTypes";
