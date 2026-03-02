import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";
import ProductDetail from "../pages/productDetail";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Profile from "../pages/profile";
import Cart from "../pages/cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/products/:id",
    element: <Layout><ProductDetail /></Layout>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Layout><Profile /></Layout>,
  },
  {
    path: "/cart",
    element: <Layout><Cart /></Layout>,
  },
]);