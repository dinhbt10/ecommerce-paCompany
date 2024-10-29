import { Sidebar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiChartPie,
  HiShoppingCart,
  HiShoppingBag,
  HiViewBoards,
} from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { SiLibreofficewriter } from "react-icons/si";
import { FaWarehouse } from "react-icons/fa";
import { clearLocalStorage } from "../../utils/common";
import { BiSolidLogOut } from "react-icons/bi";

const router = [
  {
    path: "/admin",
    title: "Thống kê",
    icon: HiChartPie,
  },
  {
    path: "/admin/categories",
    title: "Danh mục",
    icon: HiViewBoards,
  },
  {
    path: "/admin/products",
    title: "Sản phẩm",
    icon: HiShoppingBag,
  },
  {
    path: "/admin/publisher",
    title: "Nhà xuất bản",
    icon: SiLibreofficewriter,
  },
  {
    path: "/admin/distributor",
    title: "Nhà phân phối",
    icon: FaWarehouse,
  },
  {
    path: "/admin/customers",
    title: "Khách hàng",
    icon: FaUser,
  },
  {
    path: "/admin/orders",
    title: "Đơn hàng",
    icon: HiShoppingCart,
  },
  {
    path: "/admin/employee",
    title: "Nhân viên",
    icon: FaUser,
  },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPathKey = location.pathname.split("/admin/")[1]?.split("/")[0];

  const handleLogout = () => {
    clearLocalStorage();
    navigate("/");
  };

  return (
    <div className="flex">
      <Sidebar className="h-[100vh]">
        <Sidebar.Logo href="/admin">BOOKSTORE</Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {router.map((route, index) => {
              const active = route.path.includes(currentPathKey);
              if (route.path === "/admin") {
                const isActive = location.pathname === "/admin";
                return (
                  <Sidebar.Item
                    key={index}
                    as={Link}
                    to={route.path}
                    icon={route.icon}
                    className={
                      isActive
                        ? "text-slate-600 font-bold bg-slate-300 hover:text-slate-600 hover:bg-slate-300"
                        : ""
                    }
                  >
                    {route.title}
                  </Sidebar.Item>
                );
              }
              return (
                <Sidebar.Item
                  key={index}
                  as={Link}
                  to={route.path}
                  icon={route.icon}
                  className={
                    active
                      ? "text-slate-600 font-bold bg-slate-300 hover:text-slate-600 hover:bg-slate-300"
                      : ""
                  }
                >
                  {route.title}
                </Sidebar.Item>
              );
            })}
            <Sidebar.Item
              icon={BiSolidLogOut}
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Logut out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="p-6 w-full h-[100vh] overflow-auto bg-[#F5F6FA]">
        <p>{children}</p>
      </div>
    </div>
  );
};

export default AdminLayout;
