import { createContext, useContext } from "react";
import { useHome } from "../hooks/useHome";

const HomeContext = createContext();

export const useHomeContext = () => useContext(HomeContext);

export const HomeProvider = ({ children, loading }) => {
  const Home = useHome({ loading });

  return <HomeContext.Provider value={Home}>{children}</HomeContext.Provider>;
};

export default HomeProvider;
