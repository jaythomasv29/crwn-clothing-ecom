import { useContext } from "react";
import { ProductCatalogContext } from "../../contexts/product-catalog.context";
import DirectoryItem from "../directory-item/directory-item.component";
import "./category-menu-styles.scss"

const CategoryMenu = ()=> {
  const { categories } = useContext(ProductCatalogContext)
 
  return (
<div className="categories-container">
       {categories.map(category => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}


export default CategoryMenu

