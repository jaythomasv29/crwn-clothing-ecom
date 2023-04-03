import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

// Cart Helper Functions

const addProductToCart = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  if (existingCartItem) {
    const cartWithIncreasedQuantity = cartItems.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    return cartWithIncreasedQuantity;
  }
  return [...cartItems, { ...product, quantity: 1 }];
};
const decrementProductCount = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  if (existingCartItem.quantity > 1) {
    // decrease the quantity by 1
    const cartWithDecreasedQuantity = cartItems.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    return cartWithDecreasedQuantity;
  }
  // remove the item completely
  return cartItems.filter((cartItem) => cartItem.id !== product.id);
};

const clearProductCompletely = (cartItems, product) =>
  cartItems.filter((cartItem) => cartItem.id !== product.id);

// Action Creator Functions
export const toggleCartVisible = () => {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART_DISPLAY, null);
};

export const addToCart = (cartItems, product) => {
  const newCartItems = addProductToCart(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decreaseItemInCart = (cartItems, product) => {
  const newCartItems = decrementProductCount(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemsFromCart = (cartItems, product) => {
  const newCartItems = clearProductCompletely(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
