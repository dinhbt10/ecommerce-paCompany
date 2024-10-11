import Header from "../layout/home/Header.jsx";
import Footer from "./home/Footer.jsx";
import { useLocation } from "react-router-dom";

const MainLayout = (props) => {
  const location = useLocation();
  const { children } = props;
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#cd5f5f]">
      <Header />
      <div className="bg-[#f4f4f4] flex-grow">
        <div>{children}</div>
      </div>
      {location.pathname !== "/cart" && <Footer />}
    </div>
  );
};

export default MainLayout;
