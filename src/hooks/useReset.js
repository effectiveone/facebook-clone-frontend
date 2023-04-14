import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";

export const useReset = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [userInfos, setUserInfos] = useState("");
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  return {
    user,
    dispatch,
    navigate,
    visible,
    setLoading,
    email,
    setEmail,
    code,
    setCode,
    password,
    setPassword,
    conf_password,
    setConf_password,
    error,
    setError,
    userInfos,
    setUserInfos,
    logout,
    setVisible
  };
};
