import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../components/Header/Header.css";

const Header = () => {
  const [userRole, setUserRole] = useState(null);

  const [theme, setTheme] = useState(() => { //запоминает значение компонента
    // наличие сохраненной темы в localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark"; // если тема не сохранена, используем "dark" по умолчанию
  });


  useEffect(() => { // выполняет действие
    // Сохраняем выбранную тему в localStorage
    localStorage.setItem("theme", theme);
    document.body.className = theme;

    const auth = JSON.parse(localStorage.getItem("authUser") || "null");
    if (auth && auth.role) setUserRole(auth.role);
    else setUserRole(null);
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
              {userRole === "admin" && <li><Link to="/admin">Admin</Link></li>}
            </ul>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="icons">
              <FontAwesomeIcon icon={faHeart} className="icon heart" />
              <Link to="/login" className="icon user-link" title="Войти или зарегистрироваться">
                <FontAwesomeIcon icon={faUser} className="icon" />
              </Link>
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
