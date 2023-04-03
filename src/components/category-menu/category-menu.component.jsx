// import { useContext } from "react";
// import { ProductCatalogContext } from "../../contexts/product-catalog.context";
import DirectoryItem from "../directory-item/directory-item.component";
import "./category-menu-styles.scss"
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/product-catalog/product-catalog.selector";

const CategoryMenu = ()=> {
  const categories = useSelector(selectCategories)
 
  return (
<div className="categories-container">
       {categories.map(category => (
        <DirectoryItem key={category.route} category={category} />
      ))}
    </div>
  )
}


export default CategoryMenu

