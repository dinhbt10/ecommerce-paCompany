import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {
  HiChartPie,
  HiShoppingCart,
  HiShoppingBag,
  HiViewBoards,
} from "react-icons/hi";
import { FaUser } from "react-icons/fa";

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

  return (
    <div className="flex">
      <Sidebar className="h-[100vh] bg-[#FAFAFA]">
        <Sidebar.Logo href="/admin">Pa Company</Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {router.map((route, index) => {
              const active = location.pathname === route.path;
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
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="p-6 w-full h-[100vh] overflow-auto bg-[#E7E7E3]">
        <p>{children}</p>
      </div>
    </div>
  );
};

export default AdminLayout;
