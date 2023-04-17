import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component'
import { motion } from "framer-motion"

import "./category.styles.scss"
import { useSelector } from 'react-redux'
import { selectCatalogMap, selectCategoriesLoading } from '../../store/product-catalog/product-catalog.selector'
import Spinner from '../../components/spinner/spinner.component'

type CategoryRouteParams = {
  category: string;
}

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams
  const isCategoriesLoading = useSelector(selectCategoriesLoading)
  const catalogMap = useSelector(selectCatalogMap)
  const [categoryProducts, setCategoryProducts] = useState(catalogMap[category])


  useEffect(() => {
    setCategoryProducts(catalogMap[category])
  }, [category, catalogMap])
  return (
    isCategoriesLoading ?
      <Spinner />
      :
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
        <h2>{category}</h2>
        <div className="category-products-container">
          {
            categoryProducts?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </motion.div>


  )
}

export default Category