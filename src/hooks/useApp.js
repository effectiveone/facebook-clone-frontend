import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../store/actions/postsActions";
import { connectWithSocketServer } from "../components/common/realtimeCommunication/socketConnection";

const useApp = () => {
  const [visible, setVisible] = useState(false);
  const { user, darkTheme, posts } = useSelector((state) => ({ ...state }));
  const { loading } = posts;
  const dispatch = useDispatch();
  const token = user?.token;

  const fetchAllPosts = useCallback(() => {
    if (user && user.token) {
      dispatch(getAllPosts(user.token));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.token) {
      fetchAllPosts();
      connectWithSocketServer(user);
    }
  }, [fetchAllPosts, user]);

  return {
    visible,
    user,
    darkTheme,
    loading,
    posts,
    fetchAllPosts,
    setVisible,
  };
};

export default useApp;
