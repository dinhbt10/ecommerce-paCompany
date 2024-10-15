import { Routes, Route } from "react-router-dom";
import { router, adminRouter } from "./navigation/router";
import MainLayout from "./components/layout/MainLayout";
import PrivateRouter from "./navigation/PrivateRouter";
import Login from "./pages/Auth/Login/Login";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Auth/Register/Register";

function App() {
  const isAdmin = true;
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
