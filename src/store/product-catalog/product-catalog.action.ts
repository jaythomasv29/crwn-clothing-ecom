import { ThunkAction } from "redux-thunk";
import { getProductsCategories } from "../../utils/firebase.utils";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { PRODUCT_CATALOG_ACTION_TYPES } from "./product-catalog.types";
// import { RootState } from "../../utils/reducer/rootReducer";


import { Category } from "./product-catalog.types";
import { RootState } from "../root-reducer";

export type FetchCategoriesStart = Action<PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>
// ACTION CREATOR FUNCTION
export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
  return createAction(PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_START);
});


export const fetchCategoriesSuccess = withMatcher((categories: Category[]): FetchCategoriesSuccess => {
  return createAction(
    PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categories
  );
});

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => {
  return createAction(
    PRODUCT_CATALOG_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    error
  );
});

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed

export const fetchCategoriesAsync = (): ThunkAction<void, RootState, unknown, CategoryAction> => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categoriesData = await getProductsCategories();
    const categories = categoriesData.map((categoryData) => {
      const category: Category = {
        title: categoryData.title,
        imageUrl: categoryData.imageUrl,
        items: categoryData.items,
      }
      return category
    })
    dispatch(fetchCategoriesSuccess(categories));
  } catch (err) {
    dispatch(fetchCategoriesFailed(err as Error));
  }
};
