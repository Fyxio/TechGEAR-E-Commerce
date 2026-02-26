import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import ProductDetail from "../pages/productDetail";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Profile from "../pages/profile";
import Cart from "../pages/cart";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/products/:id", element: <ProductDetail /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/cart", element: <Cart /> },
]);