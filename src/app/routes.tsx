import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Community } from "./pages/Community";
import { Corporate } from "./pages/Corporate";
import { Wishlist } from "./pages/Wishlist";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: ProductDetails },
      { path: "cart", Component: Cart },
      { path: "login", Component: Login },
      { path: "dashboard", Component: Dashboard },
      { path: "community", Component: Community },
      { path: "corporate", Component: Corporate },
      { path: "wishlist", Component: Wishlist },
    ],
  },
]);