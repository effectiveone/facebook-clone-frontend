import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import LoggedInRoutes from "./utils/LoggedInRoutes";
import NotLoggedInRoutes from "./utils/NotLoggedInRoutes";
import Activate from "./components/home/activate";
import ResetPage from "./pages/ResetPage";
import CreatePostPopup from "./components/common/createPost/createPostPopup";
import FriendsPage from "./pages/FriendsPage";
import CreateStory from "./components/createStory";
import PhotoStory from "./components/createStory/PhotoStory";
import TextStory from "./components/createStory/TextStory";
import AppProvider, { useAppContext } from "./context/useAppContext";

const App = () => {
  return (
    <>
      <AppProvider>
        <RoutePicker />
      </AppProvider>
    </>
  );
};

const RoutePicker = () => {
  const { visible, user, darkTheme } = useAppContext();

  return (
    <>
      <div className={darkTheme ? "dark" : ""}>
        {visible && <CreatePostPopup />}
        <Routes>
          <Route element={<LoggedInRoutes />}>
            <Route path="/profile" element={<ProfilePage />} exact />
            <Route path="/profile/:username" element={<ProfilePage />} exact />
            <Route path="/friends" element={<FriendsPage />} exact />
            <Route path="/friends/:type" element={<FriendsPage />} exact />
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/login" />}
              exact
            />
            <Route path="/activate/:token" element={<Activate />} exact />
            <Route path="/create-story" element={<CreateStory />} exact />
            <Route path="/create-story/photo" element={<PhotoStory />} exact />
            <Route path="/create-story/text" element={<TextStory />} exact />
          </Route>
          <Route element={<NotLoggedInRoutes />}>
            <Route path="/login" element={<LoginPage />} exact />
          </Route>
          <Route path="/reset" element={<ResetPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
