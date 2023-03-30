import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/user.context";
import { ProductsCatalogProvider } from "./contexts/product-catalog.context";
import { CartProvider } from "./contexts/cart.context";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <ProductsCatalogProvider>
          <App />
        </ProductsCatalogProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
