import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import "../../components/Header/Header.css";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

  const [theme, setTheme] = useState(() => {
    // Проверяем наличие сохраненной темы в localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark"; // если тема не сохранена, используем "dark" по умолчанию
  });


  useEffect(() => {
    // Сохраняем выбранную тему в localStorage
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
      <>
        <header>
          <nav className="header-container">
            <div className="logo">
              <Link to="/">
                <img
                    src={theme === "dark" ? process.env.PUBLIC_URL + "/images/starlogowhite.png" : process.env.PUBLIC_URL + "/images/starlogoblack.png"}
                    alt="Logo"
                />

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
              <button onClick={toggleTheme} className="theme-toggle">
                <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
              </button>
            </div>
          </nav>
        </header>
      </>
  );
};

export default Header;
