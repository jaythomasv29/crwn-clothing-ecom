import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { CartState } from "./cart.reducer";

export const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartReducerSlice) => cartReducerSlice.cartItems
);

export const selectCartVisible = createSelector(
  [selectCartReducer],
  (cartReducerSlice) => cartReducerSlice.isCartVisible
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItemsSlice) => {
    return cartItemsSlice.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  }
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItemsSlice) => {
    return cartItemsSlice.reduce((acc, cartItem) => (acc + (cartItem.price * cartItem.quantity)), 0)
  }
);
