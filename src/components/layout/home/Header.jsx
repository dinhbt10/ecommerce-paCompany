import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  Button,
} from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "Cửa hàng",
    path: "/product",
  },
  {
    title: "Về chúng tôi",
    path: "/about",
  },
  {
    title: "Liên hệ",
    path: "/contact",
  },
];

function Header() {
  const navigate = useNavigate();
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Pa Company
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive ? "active" : "hover:text-[#816f5a]"
            }
            key={index}
          >
            {item.title}
          </NavLink>
        ))}
      </NavbarCollapse>
      <NavbarCollapse>
        <div className="flex flex-wrap gap-2">
          <Button
            className="bg-[#F9F1E7] hover:!bg-[#F9F1E7] text-black"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button color="gray">Register</Button>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
