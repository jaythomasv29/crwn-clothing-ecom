// Selectors use the raw data retrieved from the api and extrapolates the data in required ways
// This is where the business logic / transformations of data occurs

import { createSelector } from "reselect";

const selectProductCatalogReducer = (state) => state.products;

// Memoized selectors
export const selectCategories = createSelector(
  [selectProductCatalogReducer],
  (productCatalogSlice) => productCatalogSlice.categories
);

export const selectCatalogMap = createSelector(
  [selectProductCatalogReducer],
  (productCatalogSlice) => {
    return productCatalogSlice.categories.reduce((acc, categories) => {
      const { title, items } = categories;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesLoading = createSelector(
  [selectProductCatalogReducer],
  (productCatalogSlice) => productCatalogSlice.isLoading
);

// Before memoized selectors
// export const selectCatalogMap2 = (state) => {
//   console.log("selectCatalogMap fired");
//   return state.products.categories.reduce((acc, categories) => {
//     const { title, items } = categories;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// };

// export const selectCategories = (state) => state.products.categories;
