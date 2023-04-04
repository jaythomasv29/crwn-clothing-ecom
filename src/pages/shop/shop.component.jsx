import React, { Fragment } from 'react'
import CategoryPreview from '../../components/category-preview/category-preview.component'

import { motion } from "framer-motion"
import "./shop.styles.scss"
import { useSelector } from 'react-redux'
import { selectCatalogMap, selectCategoriesLoading } from '../../store/product-catalog/product-catalog.selector'
import Spinner from '../../components/spinner/spinner.component'
const Shop = () => {
  const isLoading = useSelector(selectCategoriesLoading)
  const catalogMap = useSelector(selectCatalogMap)

  return (
    isLoading ?
      <Spinner />
      :
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="shop-category-container">

        {
          Object.keys(catalogMap).map(category => {
            return <Fragment key={category}>
              <CategoryPreview title={category} products={catalogMap[category]} />
            </ Fragment>
          })
        }

      </motion.div>

  )
}

export default Shop