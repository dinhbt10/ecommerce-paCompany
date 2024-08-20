import Header from "../layout/home/Header.jsx";
import Footer from "../layout/home/Footer.jsx";

const MainLayout = (orops) => {
  const { children } = orops;
  return (
    <div className="w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
