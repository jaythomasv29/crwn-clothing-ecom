import React, { useState } from 'react'
import ProductCard from '../product-card/product-card.component'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { Link } from 'react-router-dom';

import "./category-preview.styles.scss"

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
       <Link to={`${title.toLowerCase()}`}><span className="title">{title.toLowerCase()}</span></Link> 
       </h2>
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