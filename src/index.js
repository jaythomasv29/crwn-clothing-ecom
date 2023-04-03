import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { UserProvider } from "./contexts/user.context";
import { ProductCatalogProvider } from "./contexts/product-catalog.context";
import { CartProvider } from "./contexts/cart.context";
import { store } from "./store/store";
import { Provider } from "react-redux";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <ProductCatalogProvider>
          <App />
        </ProductCatalogProvider>
      </CartProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
