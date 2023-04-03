import { createContext, useEffect, useReducer, useState } from 'react'
import { getProductsCatalog } from '../utils/firebase.utils';

// import { SHOP_DATA } from '../shop-data.js'
import { getProductsCategories } from '../utils/firebase.utils.js'
import { createAction } from '../utils/reducer/reducer.utils';

export const ProductCatalogContext = createContext({
  catalogMap: {},
  categories: []
})

const PRODUCT_CATALOG_ACTION_TYPES = {
  "GET_CATALOG_MAP": "GET_CATALOG_MAP",
  "GET_CATEGORIES": "GET_CATEGORIES"
}

const INITIAL_STATE = {
  catalogMap: [],
  categories: []
}

const productCatalogReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case PRODUCT_CATALOG_ACTION_TYPES.GET_CATALOG_MAP:
      return { ...state, catalogMap: payload };
    case PRODUCT_CATALOG_ACTION_TYPES.GET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      throw new Error(`Unhandled action type of ${type} in productCatalogReducer`)
  }
}

export const ProductCatalogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productCatalogReducer, INITIAL_STATE)

  // ACTION CREATOR FUNCTION
  const setCategories = (categories) => {
    dispatch(createAction(PRODUCT_CATALOG_ACTION_TYPES.GET_CATEGORIES, categories))
  }

  const setProductCatalog = (productCatalogMap) => {
    dispatch(createAction(PRODUCT_CATALOG_ACTION_TYPES.GET_CATALOG_MAP, productCatalogMap))
  }


  // const [catalogMap, setCatalogMap] = useState([]);
  // const [categories, setCategories] = useState([])

  /** COMPLETED BELOW
   * 
   * This useEffect was used to modify items in each category within firebase using a batch write method
  */

  // useEffect(() => {
  //   addCollectionAndDocuments("categories", modifyProductIDInEachCategory(SHOP_DATA));
  // }, [])

  /**
   * Get products in form of a catalog in their respective categories from firebase db
   */
  useEffect(() => {
    getProductsCatalog()
      .then(data => {
        setProductCatalog(data)
      })
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getProductsCategories();
      setCategories(categories)
    }

    getCategories()
  }, [])


  const { catalogMap, categories } = state;
  const value = { catalogMap, categories }


  return <ProductCatalogContext.Provider value={value}>{children}</ProductCatalogContext.Provider>
}