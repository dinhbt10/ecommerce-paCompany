import { Routes, Route } from "react-router-dom";
import { router, adminRouter } from "./navigation/router";
import MainLayout from "./components/layout/MainLayout";
import PrivateRouter from "./navigation/PrivateRouter";
import Login from "./pages/Auth/Login/Login";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Auth/Register/Register";
import useScrollToTop from "./hook/useScrollToTop";
import { useContext, useEffect } from "react";
import instance from "./utils/http";
import { AppContext } from "./context/app";

function App() {
  const token = localStorage.getItem("token");
  const { login, setIsAdmin, refreshUserInfo } = useContext(AppContext);
  useScrollToTop();

  const getUserInfo = async () => {
    try {
      const res = await instance.get("user/auth/me");
      const { data, success } = res.data;
      if (success) {
        login(data);
        if (data.roles[0].name === "ROLE_ADMIN") {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, refreshUserInfo]);

  return (
    <>
      <Routes>
        {router.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<MainLayout>{route.component}</MainLayout>}
          />
        ))}
        <Route element={<PrivateRouter />}>
          {adminRouter.map((route, index) => (
            <Route key={index} path={route.path} element={route.component}>
              {route.children &&
                route.children.map((child, idx) => (
                  <Route
                    key={idx}
                    path={child.path}
                    element={child.element}
                    index={child.index}
                  />
                ))}
            </Route>
          ))}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={1500} />
    </>
  );
}

export default App;
