import React, { useEffect } from 'react'
import CategoryMenu from '../../components/category-menu/category-menu.component'
import { getCategoriesAndDocuments } from '../../utils/firebase.utils'

const Home = () => {
  useEffect(() => {
    const getShoppingCategories = async () => {
      const categories = await getCategoriesAndDocuments()
      console.log(categories)

    }
    getShoppingCategories()
  }, []);
  return (
    <>
    <CategoryMenu />
    
    </>
  )
}

export default Home