import { PRODUCT_CATALOG_ACTION_TYPES } from "./product-catalog.types";

const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const productCatalogReducer = (state = INITIAL_STATE, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    // begin api request and put in loading state
    case PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    // upon successful fetch state
    case PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
