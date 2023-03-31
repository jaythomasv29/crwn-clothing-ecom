import { Link } from "react-router-dom"
import "./directory-item.styles.scss"

const Directory = ({ category }) => {
  const { title, imageUrl } = category
  return (
    <div className="directory-container">
      <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="directory-body-container">
        <Link className="directory-link" to={`/shop/${title}`}>
          <h2>{title[0].toUpperCase() + title.slice(1)}</h2>
          <p>Shop Now</p>
        </Link>
      </div>
    </div>
  )

}

export default Directory