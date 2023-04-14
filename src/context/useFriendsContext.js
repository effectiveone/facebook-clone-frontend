import { createContext, useContext } from "react";
import { useFriends } from "../hooks/useFriends";

const FriendsContext = createContext();

export const useFriendsContext = () => useContext(FriendsContext);

export const FriendsProvider = ({ children }) => {
  const Friends = useFriends();

  return (
    <FriendsContext.Provider value={Friends}>
      {children}
    </FriendsContext.Provider>
  );
};

export default FriendsProvider;
