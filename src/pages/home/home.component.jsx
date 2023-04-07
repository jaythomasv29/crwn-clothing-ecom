import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { BsArrowRight } from 'react-icons/bs'
import { Carousel } from 'react-responsive-carousel'
import CategoryMenu from '../../components/category-menu/category-menu.component'

import "./home.styles.scss"
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';
import { selectCategories, selectCategoriesLoading } from '../../store/product-catalog/product-catalog.selector';
import Spinner from '../../components/spinner/spinner.component';
const Home = () => {
  const isCategoriesLoading = useSelector(selectCategoriesLoading)
  const categories = useSelector(selectCategories)

  const carouselSettings = {
    showArrows: true,
    dynamicHeight: false,
    autoPlay: true,
    showThumbs: false,
    infiniteLoop: true,
    height: "300px",
    width: "98.7%",
  }
  return (
    isCategoriesLoading ?
      <Spinner /> :
      (<motion.div className="home-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Carousel {...carouselSettings} className="carousel-container">
          {
            categories?.map(category => (
              <div key={category.imageUrl} className="slider-container">
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
  )
}

export default Home