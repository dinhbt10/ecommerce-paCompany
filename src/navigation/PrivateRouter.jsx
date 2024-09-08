import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

const PrivateRouter = ({ isAuthenticated, isAdmin }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default PrivateRouter;
