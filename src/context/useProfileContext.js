import { createContext, useContext } from "react";
import { useProfile } from "../hooks/useProfile";

const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const Profile = useProfile();

  return (
    <ProfileContext.Provider value={Profile}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
