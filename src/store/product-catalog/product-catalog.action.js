import { getProductsCategories } from "../../utils/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { PRODUCT_CATALOG_ACTION_TYPES } from "./product-catalog.types";

// ACTION CREATOR FUNCTION
// export const setCategories = (categories) => {
//   return createAction(PRODUCT_CATALOG_ACTION_TYPES.GET_CATEGORIES, categories);
// };

export const fetchCategoriesStart = () => {
  return createAction(PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_START);
};
export const fetchCategoriesSuccess = (categories) => {
  return createAction(
    PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categories
  );
};
export const fetchCategoriesFailed = (error) => {
  return createAction(
    PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    error
  );
};

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getProductsCategories();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (err) {
    dispatch(fetchCategoriesFailed(err));
  }
};
