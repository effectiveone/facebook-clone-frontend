import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsPageInfos } from "../store/actions/friendsActions";
import { useParams } from "react-router-dom";

export const useFriends = () => {
  const dispatch = useDispatch();
  const { type } = useParams();

  const { loading, error, data } = useSelector((state) => state.friends);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFriendsPageInfos(user.token));
  }, [dispatch, user.token]);

  return { loading, error, type, data };
};
