import Home from "./pages/home/home.component";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/shop/shop.component";
import Navbar from "./components/navbar/navbar.component";
import Auth from "./pages/auth/auth.component";
import Checkout from "./pages/checkout/checkout.component";
import Category from "./pages/category/category.component";
import { useEffect } from "react";
import {
  createUserDocumentFromAuth,
  getProductsCatalog,
  getProductsCategories,
  onAuthStateChangedListener,
} from "./utils/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

import { AnimatePresence } from "framer-motion";
import {
  setCategories,
  setProductCatalog,
} from "./store/product-catalog/product-catalog.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getProductsCatalog().then((data) => {
      dispatch(setProductCatalog(data));
    });
  });

  useEffect(() => {
    getProductsCategories().then((categories) => {
      dispatch(setCategories(categories));
    });
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      // Dispatch - dispatches actions to root reducer
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/shop/:category",
          element: <Category />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
      ],
    },
  ]);
  return (
    <AnimatePresence>
      <RouterProvider router={router} />;
    </AnimatePresence>
  );
};

export default App;
