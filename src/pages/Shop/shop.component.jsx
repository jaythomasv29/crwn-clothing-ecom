import React, { useContext, useEffect } from 'react'
import ProductCard from '../../components/product-card/product-card.component'
import { CartContext } from '../../contexts/cart.context'
import { ProductsContext } from '../../contexts/products.context'
import "./shop.styles.scss"
const Shop = () => {
  const { products } = useContext(ProductsContext)

  return (
    <>
      <span className="page-title">Shop</span>
      <div className="products-container">
        {
          products.map(product => (
            <ProductCard key={product.id} product={product} />

          ))
        }
      </div>

    </>
  )
}

export default Shop