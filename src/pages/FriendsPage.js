import FriendsProvider from "../context/useFriendsContext";
import Friends from "../components/friends";
// import Layout from "../components/Layout/Layout";

const FriendsPage = () => {
  return (
    <FriendsProvider>
      <Friends />
    </FriendsProvider>
  );
};

export default FriendsPage;
