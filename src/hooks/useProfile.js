import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../store/actions/profileActions";

export const useProfile = () => {
  const [visible, setVisible] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  const userName = username === undefined ? user.username : username;

  const profile = useSelector((state) => state?.profile);
  const { loading, error } = profile;
  const dispatch = useDispatch();

  const visitor = userName === user.username ? false : true;
  const [othername, setOthername] = useState();
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };

  useEffect(() => {
    dispatch(
      getProfile(userName, user.token, navigate, path, sort, max, setPhotos)
    );
  }, [userName]);

  useEffect(() => {
    if (profile?.details?.otherName) {
      setOthername(profile.details.otherName);
    }
  }, [profile]);

  return {
    visible,
    username,
    navigate,
    user,
    photos,
    loading,
    profile,
    visitor,
    othername,
    height,
    profileTop,
    leftSide,
    leftHeight,
    scrollHeight,
    setVisible,
    check,
    setOthername,
    userName,
  };
};
