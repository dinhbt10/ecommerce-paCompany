import Categories from "../pages/admins/Categories/Categories";
import Customers from "../pages/admins/Customers/Customers";
import Dashboard from "../pages/admins/Dashboard/Dashboard";
import Distributor from "../pages/admins/Distributor/Distributor";
import Orders from "../pages/admins/Orders/Orders";
import { AddOrEditProduct } from "../pages/admins/Products/AddOrEditProd";
import Products from "../pages/admins/Products/Product";
import Publisher from "../pages/admins/Publisher/Publisher";
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
    path: "/admin/products/create",
    component: <AddOrEditProduct />,
  },
  {
    path: "/admin/customers",
    component: <Customers />,
  },
  {
    path: "/admin/orders",
    component: <Orders />,
  },
  {
    path: "/admin/publisher",
    component: <Publisher />,
  },
  {
    path: "/admin/distributor",
    component: <Distributor />,
  },
];
