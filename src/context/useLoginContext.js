import { createContext, useContext } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const Login = useLogin();

  return (
    <LoginContext.Provider value={Login}>{children}</LoginContext.Provider>
  );
};

export default LoginProvider;
