import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";
import { Link, NavLink } from "react-router-dom";

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
          <NavbarLink
            as={NavLink}
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : "")}
            key={index}
          >
            {item.title}
          </NavbarLink>
        ))}
      </NavbarCollapse>
      <NavbarCollapse>
        <div className="flex flex-wrap gap-2">
          <Button>Login</Button>
          <Button color="gray">Register</Button>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
