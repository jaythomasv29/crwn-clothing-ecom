import React from 'react'
import Sidebar from '../../components/side-bar/side-bar.component'
import { useSelector } from 'react-redux'
import { selectCatalogMap } from '../../store/product-catalog/product-catalog.selector'
import { Link } from 'react-router-dom'


const Admin = () => {
  const catalogMap = useSelector(selectCatalogMap)
  return (

   <div>
    <Sidebar titles={Object.keys(catalogMap)}/>

   </div> 
  )
}

export default Admin