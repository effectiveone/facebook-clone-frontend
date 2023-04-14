import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../inputs/loginInput";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <Box className="login_wrap" display="flex" flexDirection="column">
      <Box
        className="login_1"
        display="flex"
        alignItems="center"
        marginBottom="20px"
      >
        <img src="../../icons/facebook.svg" alt="" />
        <Typography>
          Facebook helps you connect and share with the people in your life.
        </Typography>
      </Box>
      <Box className="login_2" display="flex" flexDirection="column">
        <Box className="login_2_wrap" marginBottom="20px">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <Button type="submit" variant="contained" color="primary">
                  Log In
                </Button>
              </Form>
            )}
          </Formik>
          <Link to="/reset" className="forgot_password">
            Forgotten password?
          </Link>
          <Box display="flex" alignItems="center" marginTop="10px">
            <CircularProgress
              color="primary"
              size={30}
              thickness={5}
              style={{ visibility: loading ? "visible" : "hidden" }}
            />
            {error && (
              <Typography className="error_text" color="error">
                {error}
              </Typography>
            )}
          </Box>
          <Box
            className="sign_splitter"
            height="1px"
            bgcolor="#dadde1"
            marginBottom="20px"
            marginTop="20px"
          ></Box>
          <Button
            variant="contained"
            color="primary"
            className="open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </Button>
        </Box>
        <Link to="/" className="sign_extra">
          <Typography component="span" variant="body1">
            <b>Create a Page</b> for a celebrity, brand or business.
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}
