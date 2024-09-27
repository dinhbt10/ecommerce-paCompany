import Header from "../layout/home/Header.jsx";
import Footer from "./home/Footer.jsx";

const MainLayout = (orops) => {
  const { children } = orops;
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#cd5f5f]">
      <Header />
      <div className="bg-[#f4f4f4] flex-grow">
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
