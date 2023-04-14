import ProfileProvider from "../context/useProfileContext";
import Profile from "../components/profile";
// import Layout from "../components/Layout/Layout";

const ProfilePage = () => {
  return (
    <ProfileProvider>
      <Profile />
    </ProfileProvider>
  );
};

export default ProfilePage;
