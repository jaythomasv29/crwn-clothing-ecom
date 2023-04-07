import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../product-catalog/product-catalog.types";
import { CartItem } from "./cart.types"
import { CART_ACTION_TYPES } from "./cart.types";

// Cart Helper Functions

const addProductToCart = (cartItems: CartItem[], product: CategoryItem): CartItem[] => {
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
const decrementProductCount = (cartItems: CartItem[], product: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  if (existingCartItem && existingCartItem.quantity > 1) {
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

const clearProductCompletely = (cartItems: CartItem[], product: CartItem): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== product.id);

export type ToogleCart = Action<CART_ACTION_TYPES.TOGGLE_CART_DISPLAY>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>
// Action Creator Functions

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems) )

export const toggleCartVisible = withMatcher((): ToogleCart => {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART_DISPLAY, null);
});

export const addToCart = (cartItems: CartItem[], product: CategoryItem) => {
  const newCartItems = addProductToCart(cartItems, product);
  return setCartItems(newCartItems);
};

export const decreaseItemInCart = (cartItems: CartItem[], product: CartItem) => {
  const newCartItems = decrementProductCount(cartItems, product);
  return setCartItems(newCartItems);
};

export const clearItemsFromCart = (cartItems: CartItem[], product: CartItem) => {
  const newCartItems = clearProductCompletely(cartItems, product);
  return setCartItems(newCartItems);
};