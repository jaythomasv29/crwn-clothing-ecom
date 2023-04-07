import { CartItem } from "./cart.types";
import { AnyAction } from "redux";
import { setCartItems, toggleCartVisible } from "./cart.action";

const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartVisible: false,
};

export type CartState = {
  readonly cartItems: CartItem[]
  readonly cartCount: number;
  readonly cartTotal: number
  readonly isCartVisible: boolean
}

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }
  if (toggleCartVisible.match(action)) {
    return { ...state, isCartVisible: !state.isCartVisible };
  }
  return state;
};
