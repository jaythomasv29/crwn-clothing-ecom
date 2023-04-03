import { createAction } from "../../utils/reducer/reducer.utils";
import { PRODUCT_CATALOG_ACTION_TYPES } from "./product-catalog.types";

// ACTION CREATOR FUNCTION
export const setCategories = (categories) => {
  return createAction(PRODUCT_CATALOG_ACTION_TYPES.GET_CATEGORIES, categories);
};

export const setProductCatalog = (productCatalogMap) => {
  return createAction(
    PRODUCT_CATALOG_ACTION_TYPES.GET_CATALOG_MAP,
    productCatalogMap
  );
};
