import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import "../../components/Header/Header.css";


const Header = () => {
  return (
    <> 
      <header>
        <nav className="header-container">
          <div className="logo">
            <Link to="/">
              <img src="./images/starlogowhite.png" alt="Logo" />
            </Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/series">Series</Link></li>
            <li><Link to="/movies">Movies</Link></li>
          </ul>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="icons">
            <FontAwesomeIcon icon={faHeart} className="icon heart" />
            <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
        </nav>
      </header>
      
    </>
  );
};

export default Header;
