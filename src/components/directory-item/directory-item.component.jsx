import { useNavigate } from "react-router-dom";

import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";


/*
Component that renders each individual clothing category on the homepage
with a unique background image, the title, and 'Shop Now' text.

Props:
category -> An object containing a clothing category's title and imageUrl
*/
const DirectoryItem = ({ category }) => {
    const { title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
          <BackgroundImage 
            imageurl={imageUrl} 
          />
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem