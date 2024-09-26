import Header from "../layout/home/Header.jsx";
import Footer from "./home/Footer.jsx";

const MainLayout = (orops) => {
  const { children } = orops;
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#2c55a5]">
      <Header />
      <div className="bg-[#f4f4f4] flex-grow">
        <div className="max-w-[1100px] mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
