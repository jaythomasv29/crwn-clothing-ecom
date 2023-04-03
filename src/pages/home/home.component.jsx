import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { BsArrowRight } from 'react-icons/bs'
import { Carousel } from 'react-responsive-carousel'
import CategoryMenu from '../../components/category-menu/category-menu.component'

import "./home.styles.scss"
import { Link } from 'react-router-dom';
import {motion } from "framer-motion"
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/product-catalog/product-catalog.selector';
const Home = () => {
const categories = useSelector(selectCategories)
  // const { categories } = useContext(ProductCatalogContext)

  // useEffect(() => {
  //   const getShoppingCategories = async () => {
  //     const categories = await getCategoriesAndDocuments()
  //     console.log(categories)

  //   }
  //   getShoppingCategories()
  // }, []);

  const carouselSettings = {
    showArrows: false,
    dynamicHeight: false,
    autoPlay: true,
    showThumbs: false,
    infiniteLoop: true,
    height: "300px",
    width: "98.7%",
  }
  return (

  categories.length ?
    (<motion.div className="home-container" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Carousel {...carouselSettings} className="carousel-container">
        {
          categories?.map(category => (
            <div key={category.id} className="slider-container">
              <div className="slider-image-container">
                <img className="slider-image" src={category.imageUrl} alt={category.title} />
              </div>
              <div className='legend-container'>
                <Link to={`/shop/${category.title.toLowerCase()}`}>

                  <p className='legend'>{category.title} <BsArrowRight /></p>
                </Link>


              </div>
            </div>
          ))
        }

      </Carousel>
      <CategoryMenu />

    </motion.div>)
    : <></>
  )
}

export default Home