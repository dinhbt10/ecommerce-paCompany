import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import { getUserInfoLocalStorage } from "../utils/common";

const PrivateRouter = ({ isAdmin }) => {
  const userInfo = getUserInfoLocalStorage();
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  if (userInfo.roles[0] === "USER") {
    return <Navigate to="/" />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default PrivateRouter;
