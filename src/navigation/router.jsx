import Categories from "../pages/admins/Categories/Categories";
import Customers from "../pages/admins/Customers/Customers";
import Dashboard from "../pages/admins/Dashboard/Dashboard";
import Orders from "../pages/admins/Orders/Orders";
import Products from "../pages/admins/Products/Product";
import HomePage from "../pages/clients/Homepage/Homepage";
import Product from "../pages/clients/Product/Product";
import ProductDetail from "../pages/clients/Product/ProductDetail";

export const router = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/product",
    component: <Product />,
  },
  {
    path: "/product/:id",
    component: <ProductDetail />,
  },
];

export const adminRouter = [
  {
    path: "/admin",
    component: <Dashboard />,
  },
  {
    path: "/admin/categories",
    component: <Categories />,
  },
  {
    path: "/admin/products",
    component: <Products />,
  },
  {
    path: "/admin/customers",
    component: <Customers />,
  },
  {
    path: "/admin/orders",
    component: <Orders />,
  },
];
