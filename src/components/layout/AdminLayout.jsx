import { Sidebar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../utils/common";
import {
  LayoutDashboard,
  ShoppingCart,
  BookOpenCheck,
  User,
  LogOut,
  House,
} from "lucide-react";

const childrenRoute = [
  {
    type: "item",
    path: "/admin",
    title: "Thống kê",
    icon: LayoutDashboard,
  },
  {
    type: "collapse",
    title: "E-commerce",
    icon: ShoppingCart,
    children: [
      {
        path: "/admin/categories",
        title: "Danh mục",
      },
      {
        path: "/admin/products",
        title: "Sản phẩm",
      },
      {
        path: "/admin/orders",
        title: "Đơn hàng",
      },
    ],
  },
  {
    type: "collapse",
    title: "Nguồn hàng",
    icon: BookOpenCheck,
    children: [
      {
        path: "/admin/publisher",
        title: "Nhà xuất bản",
      },
      {
        path: "/admin/distributor",
        title: "Nhà phân phối",
      },
    ],
  },
  {
    type: "collapse",
    title: "Users",
    icon: User,
    children: [
      {
        path: "/admin/customers",
        title: "Khách hàng",
      },
      {
        path: "/admin/employee",
        title: "Nhân viên",
      },
    ],
  },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
            {childrenRoute.map((item, key) => {
              if (item.type === "collapse") {
                return (
                  <Sidebar.Collapse
                    icon={item.icon}
                    label={item.title}
                    key={key}
                  >
                    {item.children.map((child, index) => {
                      const active = child.path === location.pathname;
                      return (
                        <Sidebar.Item
                          key={index}
                          as={Link}
                          to={child.path}
                          className={
                            active
                              ? "text-white font-bold bg-[#d76e6e] hover:bg-[#d76e6e]"
                              : ""
                          }
                        >
                          {child.title}
                        </Sidebar.Item>
                      );
                    })}
                  </Sidebar.Collapse>
                );
              }
              const active = location.pathname === "/admin";
              return (
                <Sidebar.Item
                  as={Link}
                  to={item.path}
                  icon={item.icon}
                  key={key}
                  className={
                    active
                      ? "text-white font-bold bg-[#d76e6e] hover:bg-[#d76e6e]"
                      : ""
                  }
                >
                  {item.title}
                </Sidebar.Item>
              );
            })}
            <Sidebar.Item
              icon={House}
              onClick={() => navigate("/")}
              className="cursor-pointer"
            >
              Về trang sản phẩm
            </Sidebar.Item>
            <Sidebar.Item
              icon={LogOut}
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Đăng xuất
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
