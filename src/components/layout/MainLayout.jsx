import Header from "../layout/home/Header.jsx";

const MainLayout = (orops) => {
  const { children } = orops;
  return (
    <div className="w-full mb-10">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
