import LoginProvider from "../context/useLoginContext";
import Login from "../components/login";
// import Layout from "../components/Layout/Layout";

const LoginPage = () => {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  );
};

export default LoginPage;
