import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component'
import { motion } from "framer-motion"

import "./category.styles.scss"
import { useSelector } from 'react-redux'
import { selectCatalogMap } from '../../store/product-catalog/product-catalog.selector'
const Category = () => {
  const { category } = useParams()
  const catalogMap = useSelector(selectCatalogMap)
  const [categoryProducts, setCategoryProducts] = useState([])

  useEffect(() => {
    setCategoryProducts(catalogMap[category])
  }, [category, catalogMap])
  return (
    categoryProducts?.length ?
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
      <h2>{category}</h2>
      <div className="category-products-container">
        {
          categoryProducts?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </motion.div>
    :
    <></>
  )
}

export default Category