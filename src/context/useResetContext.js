import { createContext, useContext } from "react";
import { useReset } from "../hooks/useReset";

const ResetContext = createContext();

export const useResetContext = () => useContext(ResetContext);

export const ResetProvider = ({ children }) => {
  const Reset = useReset();

  return (
    <ResetContext.Provider value={Reset}>{children}</ResetContext.Provider>
  );
};

export default ResetProvider;
