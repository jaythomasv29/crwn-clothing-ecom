import React, { useState } from 'react'
import ProductCard from '../product-card/product-card.component'
import "./category-preview.styles.scss"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
const PER_PAGE = 4;
const CategoryPreview = ({ title, products }) => {
  const [currentStart, setCurrentStart] = useState(0)
  const [currentEnd, setCurrentEnd] = useState(PER_PAGE);

  const onSlideLeft = () => {
    setCurrentStart(currentStart - PER_PAGE)
    setCurrentEnd(currentEnd - PER_PAGE)
  }

  const onSlideRight = () => {
    setCurrentStart(currentStart + PER_PAGE)
    setCurrentEnd(currentEnd + PER_PAGE)
  }

  return (
    <div className="category-preview-container">
      <h2>
        <span className="title">{title}</span></h2>
      <div className="preview-wrapper">

        <div className='preview-control-left'>
          {
            currentStart > 0 &&
            <AiOutlineArrowLeft onClick={onSlideLeft} />
          }
        </div>
        <div className="preview-container">
          {
            products.slice(currentStart, currentEnd).map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
        <div className="preview-control-right">
          {
            currentEnd < products.length &&
            <AiOutlineArrowRight onClick={onSlideRight} />
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryPreview