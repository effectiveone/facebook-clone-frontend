import axios from 'axios';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfile } from '../store/actions/profileActions';
import { getOrCreateToken } from '../helpers/authHelper';

export const useProfile = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [photos, setPhotos] = useState({});
  const { username } = useParams();

  const userName = username === undefined ? user?.username : username;

  const profile = useSelector((state) => state.profile);
  const { loading, error } = profile;
  const dispatch = useDispatch();

  const visitor = userName === user?.username ? false : true;
  const [othername, setOthername] = useState();
  const path = `${userName}/*`;
  const max = 30;
  const sort = 'desc';

  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();

  useEffect(() => {
    if (profileTop.current) {
      setHeight(profileTop.current.clientHeight + 300);
    }
    if (leftSide.current) {
      setLeftHeight(leftSide.current.clientHeight);
    }
    window.addEventListener('scroll', getScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);

  const check = useMediaQuery({
    query: '(min-width:901px)',
  });

  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };

  useEffect(() => {
    if (userName) {
      // Użyj tokena z user jeśli istnieje, w przeciwnym razie użyj tymczasowego tokena
      const token = user?.token || getOrCreateToken();

      dispatch(
        getProfile(userName, token, navigate, path, sort, max, setPhotos),
      );
    }
  }, [userName]);

  useEffect(() => {
    if (profile?.details?.otherName) {
      setOthername(profile.details.otherName);
    }
  }, [profile]);

  return useMemo(
    () => ({
      loading,
      error,
      profile,
      visitor,
      profileTop,
      leftSide,
      height,
      leftHeight,
      scrollHeight,
      check,
      photos,
      othername,
      visible,
      setVisible,
      userName,
      user,
      dispatch,
    }),
    [
      loading,
      error,
      profile,
      visitor,
      profileTop,
      leftSide,
      height,
      leftHeight,
      scrollHeight,
      check,
      photos,
      othername,
      visible,
      userName,
      user,
    ],
  );
};
