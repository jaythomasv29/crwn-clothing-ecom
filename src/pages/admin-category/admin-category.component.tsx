import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { selectCatalogMap } from '../../store/product-catalog/product-catalog.selector'
import { useParams } from 'react-router-dom'
type CategoryRouteParams = {
  category: string;
}
const AdminCategory = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams

  console.log(category)
  const catalogMap = useSelector(selectCatalogMap)
  const [productsFromCategory, setProductsFromCategory] = useState(catalogMap[category])

  useEffect(() => {
    setProductsFromCategory(catalogMap[category])
  }, [category, catalogMap])

  return (
    <div>
      {
        productsFromCategory.map(products => (
          <div>{products.name}</div>
        ))
      }
    </div>
  )
}

export default AdminCategory