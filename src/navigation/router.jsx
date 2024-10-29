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
import Cart from "../pages/clients/Cart/Cart";
import { EditBook } from "../pages/admins/Products/EditBook";
import User from "../pages/clients/User/User";
import Checkout from "../pages/clients/Checkout/Checkout";
import OrderDetail from "../pages/clients/Orders/OrderDetail";

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
  {
    path: "/cart",
    component: <Cart />,
  },
  {
    path: "/user",
    component: <User />,
  },
  {
    path: "/checkout",
    component: <Checkout />,
  },
  {
    path: "/orders/:id",
    component: <OrderDetail />,
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
    path: "/admin/products/:id",
    component: <EditBook />,
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
  {
    path: "/admin/employee",
    component: <span>Đang phát triển</span>,
  },
];
