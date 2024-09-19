import { Routes, Route } from "react-router-dom";
import { router, adminRouter } from "./navigation/router";
import MainLayout from "./components/layout/MainLayout";
import PrivateRouter from "./navigation/PrivateRouter";
import Login from "./pages/Auth/Login/Login";
function App() {
  const isAuthenticated = true;
  const isAdmin = true;
  return (
    <Routes>
      {router.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<MainLayout>{route.component}</MainLayout>}
        />
      ))}
      <Route
        element={
          <PrivateRouter isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        }
      >
        {adminRouter.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
