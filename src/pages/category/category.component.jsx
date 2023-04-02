import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component'
import { ProductCatalogContext } from '../../contexts/product-catalog.context'

import "./category.styles.scss"
const Category = () => {
  const { category } = useParams()
  const { catalogMap } = useContext(ProductCatalogContext)
  const [categoryProducts, setCategoryProducts] = useState([])

  useEffect(() => {
    setCategoryProducts(catalogMap[category])
  }, [category, catalogMap])
  return (
    <div>
      <h2>{category}</h2>
      <div className="category-products-container">
      {
      categoryProducts?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
    </div>
  )
}

export default Category