import React, { Fragment, useContext } from 'react'
import CategoryPreview from '../../components/category-preview/category-preview.component'

import { ProductsCatalogContext } from '../../contexts/product-catalog.context'
import "./shop.styles.scss"
const Shop = () => {
  const { catalogMap } = useContext(ProductsCatalogContext)

  return (
    <>
      {/* <h2 className="page-title">shop</h2> */}

      {
        Object.keys(catalogMap).map(category => {
          return <Fragment key={category}>
            <CategoryPreview title={category} products={catalogMap[category]} />
          </ Fragment>
        })
      }

    </>
  )
}

export default Shop