import Home from "./pages/Home/home.component";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop/shop.component";
import Navbar from "./components/navbar/navbar.component";
import Auth from "./pages/Auth/auth.component";

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
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />
};

export default App;
