import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../store/actions/postsActions";

const useApp = () => {
  const [visible, setVisible] = useState(false);
  const { user, darkTheme, posts } = useSelector((state) => ({ ...state }));
  const { loading } = posts;
  const dispatch = useDispatch();

  const fetchAllPosts = useCallback(() => {
    dispatch(getAllPosts(user?.token));
  }, [dispatch, user?.token]);

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

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
