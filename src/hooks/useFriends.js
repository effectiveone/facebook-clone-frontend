import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsPageInfos } from '../store/actions/friendsActions';
import { useParams } from 'react-router-dom';

export const useFriends = () => {
  const dispatch = useDispatch();
  const { type } = useParams();

  const { loading, error, data } = useSelector((state) => state.friends);
  const { friends } = useSelector((state) => state);

  const user = useSelector((state) => state.user);

  // Dodatkowo zapisujemy token w localStorage, jeśli istnieje, ale nie jest tam zapisany
  useEffect(() => {
    if (user && user.token && !localStorage.getItem('auth_token')) {
      localStorage.setItem('auth_token', user.token);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.token) {
      dispatch(getFriendsPageInfos(user.token));
    }
  }, [dispatch, user]);

  return { loading, error, type, data, friends };
};
