import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import { useContext } from "react";
import { AppContext } from "../context/app";

const PrivateRouter = () => {
  const { userInfo } = useContext(AppContext);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (userInfo.roles[0].name === "ROLE_USER") {
    return <Navigate to="/" />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default PrivateRouter;
