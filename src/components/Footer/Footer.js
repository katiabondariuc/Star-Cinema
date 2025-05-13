import React from "react";
import "./Footer.css"; // Убедись, что путь правильный

const Footer = () => {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-box">
            <ul className="footer-links">
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Watch List</li>
            </ul>
            <p>© 2025 MOVIE STREAM. All Rights Reserved. All movies and shows on this platform are trademarks of their respective owners.</p>
          </div>
          <div className="footer-box">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-github"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
          <div className="footer-box">
            <h3>Get Our App</h3>
            <div className="app-links">
              <img src="https://img.icons8.com/color/48/000000/apple-app-store--v3.png" alt="App Store" />
              <span>App Store</span>
              <img src="https://img.icons8.com/fluency/48/000000/google-play.png" alt="Google Play Store" />
              <span>Google Play Store</span>
            </div>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;