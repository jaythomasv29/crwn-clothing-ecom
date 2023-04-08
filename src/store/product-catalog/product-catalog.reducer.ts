import { Category } from "./product-catalog.types";

import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "./product-catalog.action"
import { AnyAction } from "redux";

export type ProductCatalogState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const CATEGORIES_INITIAL_STATE: ProductCatalogState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const productCatalogReducer = (state = CATEGORIES_INITIAL_STATE, action: AnyAction): ProductCatalogState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, isLoading: false, categories: action.payload };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, isLoading: false, error: action.payload}
  }

  return state;
};
