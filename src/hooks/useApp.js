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
    localStorage.setItem("user", JSON.stringify({ token }));
    dispatch(getAllPosts(user?.token));
  }, [dispatch, user?.token]);

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  useEffect(() => {
    connectWithSocketServer(user);
  }, []);
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
