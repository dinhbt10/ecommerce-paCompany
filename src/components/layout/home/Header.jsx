import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "Cửa hàng",
    path: "/shop",
    items: [
      { title: "Services 1", href: "#" },
      { title: "Services 2", href: "#" },
      { title: "Services 3", href: "#" },
    ],
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
  const location = useLocation();
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Pa Company
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {menuItems.map((item, index) => (
          <NavbarLink
            as={Link}
            href={item.path}
            active={location.pathname.includes(item.path)}
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
