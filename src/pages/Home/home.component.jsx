import React, { useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { BsArrowRight } from 'react-icons/bs'
import { Carousel } from 'react-responsive-carousel'
import CategoryMenu from '../../components/category-menu/category-menu.component'
import { getCategoriesAndDocuments } from '../../utils/firebase.utils'

import "./home.styles.scss"
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    },
  ];
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
    <div className="home-container">
      <Carousel {...carouselSettings} className="carousel-container">
        {
          categories.map(category => (
            <div key={category.id} className="slider-container">
              <div className="slider-image-container">
                <img className="slider-image" src={category.imageUrl} alt={category.title} />
              </div>
              <div className='legend-container'>
                <Link to={`/shop/${category.title}`}>
                  
                <p className='legend'>{category.title} <BsArrowRight /></p>
                </Link>
                

              </div>
            </div>
          ))
        }

      </Carousel>
      <CategoryMenu />

    </div>
  )
}

export default Home