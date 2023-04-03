import { PRODUCT_CATALOG_ACTION_TYPES } from "./product-catalog.types";

const INITIAL_STATE = {
  catalogMap: [],
  categories: [],
};

export const productCatalogReducer = (state = INITIAL_STATE, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case PRODUCT_CATALOG_ACTION_TYPES.GET_CATALOG_MAP:
      return { ...state, catalogMap: payload };
    case PRODUCT_CATALOG_ACTION_TYPES.GET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
