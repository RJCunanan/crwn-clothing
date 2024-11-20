import './category-item.styles.scss'


/*
Component that renders each individual clothing category on the homepage
with a unique background image, the title, and 'Shop Now' text.

Props:
category -> An object containing a clothing category's title and imageUrl
*/
const CategoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <div className="category-container">
          <div className='background-image' style={{
            backgroundImage: `url(${imageUrl})`
          }} />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
    )
}

export default CategoryItem