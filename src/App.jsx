import { Routes, Route } from "react-router-dom";
import { router, adminRouter } from "./navigation/router";
import MainLayout from "./components/layout/MainLayout";
import PrivateRouter from "./navigation/PrivateRouter";
import Login from "./pages/Auth/Login/Login";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Auth/Register/Register";
import useScrollToTop from "./hook/useScrollToTop";
import { useEffect } from "react";
import instance from "./utils/http";
import { saveToLocalStorage } from "./utils/common";

function App() {
  const isAdmin = true;
  const token = localStorage.getItem("token");
  useScrollToTop();

  const getUserInfo = async () => {
    try {
      if (!token) return;
      const res = await instance.get("user/auth/me");
      const { data, success } = res.data;
      if (success) {
        console.log(data);
        saveToLocalStorage(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
        <Route element={<PrivateRouter isAdmin={isAdmin} />}>
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
      <ToastContainer />
    </>
  );
}

export default App;
