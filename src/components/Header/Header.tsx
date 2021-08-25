import React from 'react';
import image from "../../image/nasa2.png";
import './header.scss';

const Header = () => {
    return (
        <div className="header">
            <img
                className="header__img-title"
                src={image}
                alt="img"/>
            <h1>
                Mars Rovers Photos
            </h1>
        </div>
    )
}
export default Header;
