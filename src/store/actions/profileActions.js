import axios from 'axios';
import * as types from '../types/profileTypes';

export const getProfile =
  (userName, token, navigate, path, sort, max, setPhotos) =>
  async (dispatch) => {
    try {
      console.log('Pobieranie profilu dla użytkownika:', userName);
      dispatch({ type: types.PROFILE_REQUEST });

      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        { headers },
      );

      console.log('Otrzymano dane profilu:', res.data);

      dispatch({
        type: types.PROFILE_SUCCESS,
        payload: res.data,
      });

      // Pobierz zdjęcia użytkownika
      if (path && sort && max) {
        try {
          const photosRes = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            {
              headers,
              params: {
                path,
                sort,
                max,
              },
            },
          );
          console.log('Otrzymano zdjęcia:', photosRes.data);
          setPhotos(photosRes.data);
        } catch (error) {
          console.error('Błąd podczas pobierania zdjęć:', error);
        }
      }
    } catch (error) {
      console.error('Błąd podczas pobierania profilu:', error);
      dispatch({
        type: types.PROFILE_ERROR,
        payload: error.response?.data?.message || 'Something went wrong.',
      });
    }
  };

export * from '../types/profileTypes';
