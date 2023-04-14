import HomeProvider from "../context/useHomeContext";
import Home from "../components/home";
// import Layout from "../components/Layout/Layout";

const HomePage = () => {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  );
};

export default HomePage;
