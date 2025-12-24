import { useAuth } from "../../context/AuthContext";
import { HomePageLayout } from "./components/HomePageLayout";

const HomePage = () => {
  const { user } = useAuth();
  return <HomePageLayout user={user} />;
};

export default HomePage;
