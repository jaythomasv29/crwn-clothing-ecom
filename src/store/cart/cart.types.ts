import { CategoryItem } from "../product-catalog/product-catalog.types";

export interface CartItem extends CategoryItem {
  quantity: number,
}


// Intersection type
/**
export type CartItem = CategoryItem & {
  quantity: number;
}
 */


export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = "SET_CART_ITEMS",
  TOGGLE_CART_DISPLAY = "TOGGLE_CART_DISPLAY",
};
