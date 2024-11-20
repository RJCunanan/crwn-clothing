import CategoryItem from "../category-item/category-item.component";
import './directory.styles.scss';


/*
Component that renders onto the homepage each category of clothing.

Props:
categories -> An array of objects containing an id, title, and imageUrl
of each clothing category.
*/
const Directory = ({ categories }) => {
    return (
        <div className="directory-container">
        {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
        ))}
        </div>
    )
}

export default Directory