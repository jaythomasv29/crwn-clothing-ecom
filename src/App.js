import Home from "./pages/home/home.component";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/shop/shop.component";
import Navbar from "./components/navbar/navbar.component";
import Auth from "./pages/auth/auth.component";
import Checkout from "./pages/checkout/checkout.component";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/shop",
          element: <Shop />
        },
        {
          path: "/auth",
          element: <Auth />
        },
        {
          path: "/checkout",
          element: <Checkout />
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />
};

export default App;
