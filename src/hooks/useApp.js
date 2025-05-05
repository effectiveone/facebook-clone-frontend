import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../store/actions/postsActions';
import { connectWithSocketServer } from '../components/common/Realtime-communication/socketConnection';

const useApp = () => {
  const [visible, setVisible] = useState(false);

  const user = useSelector((state) => state.user);
  const darkTheme = useSelector((state) => state.darkTheme);
  const posts = useSelector((state) => state.posts);

  const { loading } = posts;
  const dispatch = useDispatch();

  const fetchAllPosts = useCallback(() => {
    if (user && user.token) {
      dispatch(getAllPosts(user.token));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.token) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Użytkownik zalogowany:', user.id);
      }

      fetchAllPosts();
      connectWithSocketServer(user);
    }
  }, [fetchAllPosts, user]);

  return useMemo(
    () => ({
      visible,
      user,
      darkTheme,
      loading,
      posts,
      fetchAllPosts,
      setVisible,
    }),
    [visible, user, darkTheme, loading, posts, fetchAllPosts],
  );
};

export default useApp;
