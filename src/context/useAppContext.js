import { createContext, useContext } from "react";
import useApp from "../hooks/useApp";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const App = useApp();

  return <AppContext.Provider value={App}>{children}</AppContext.Provider>;
};

export default AppProvider;
