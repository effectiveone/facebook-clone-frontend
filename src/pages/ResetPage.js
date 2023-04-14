import ResetProvider from "../context/useResetContext";
import Reset from "../components/reset";
// import Layout from "../components/Layout/Layout";

const ResetPage = () => {
  return (
    <ResetProvider>
      <Reset />
    </ResetProvider>
  );
};

export default ResetPage;
