import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./HeaderSlider.css";

const HeaderSlider = () => {
    return (
      <div className="slider-container">
        <Swiper navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]} className="header-swiper">
          <SwiperSlide>
            <div className="slide-content">
              <img src="./images/1200px-Bohemian_Rhapsody_The_Original_Soundtrack.jpg" alt="Slide 1" />
              <div className="overlay">
                <h2>Фильм 1</h2>
                <a href="/movie/1" className="watch-now">Watch Now</a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <img src="./images/gladiator-gladiator-date-2000-K36B8T.jpg" alt="Slide 2" />
              <div className="overlay">
                <h2>Фильм 2</h2>
                <a href="/movie/2" className="watch-now">Watch Now</a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <img src="./images/582464_original.jpg" alt="Slide 3" />
              <div className="overlay">
                <h2>Фильм 3</h2>
                <a href="/movie/3" className="watch-now">Watch Now</a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  };
  
  export default HeaderSlider;