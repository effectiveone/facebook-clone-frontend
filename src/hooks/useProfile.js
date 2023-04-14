import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import {
  PROFILE_REQUEST as getProfileRequest,
  PROFILE_SUCCESS as getProfileSuccess,
  PROFILE_ERROR as getProfileError,
  setOthername,
} from "../store/actions/profileActions";

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

  useEffect(() => {
    getProfile();
  }, [userName]);

  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);

  const visitor = userName === user.username ? false : true;
  const [othername, setOthername] = useState();
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  const getProfile = async () => {
    try {
      dispatch(getProfileRequest());
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
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
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images?.data);
        } catch (error) {
          console.log(error);
        }
        dispatch(getProfileSuccess(res.data));
      }
    } catch (error) {
      dispatch(getProfileError(error.response?.data?.message));
    }
  };

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
