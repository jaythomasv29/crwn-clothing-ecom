import { createContext, useEffect, useState } from 'react'
import { getProductsCatalog } from '../utils/firebase.utils';

// import { SHOP_DATA } from '../shop-data.js'
import { getProductsCategories } from '../utils/firebase.utils.js'

export const ProductsCatalogContext = createContext({
  catalogMap: {},
  categories: []
})

export const ProductsCatalogProvider = ({ children }) => {
  const [catalogMap, setCatalogMap] = useState([]);
  const [categories, setCategories] = useState([])


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
        setCatalogMap(data)
      })
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getProductsCategories();
      setCategories(categories)
    }

    getCategories()
  }, [])

  const value = { catalogMap, categories }


  return <ProductsCatalogContext.Provider value={value}>{children}</ProductsCatalogContext.Provider>
}