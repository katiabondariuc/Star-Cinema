import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./MovieSlider.css";

const movies = [
  { id: 1, title: "Фильм 1", image: "./images/imgslide/the-witcher-poster-2019-credit-netflix-the-hollywood-archive-2AGAWRY.jpg" },
  { id: 2, title: "Фильм 2", image: "./images/imgslide/titanic-movie-poster-1997-EJWP0H.jpg" },
  { id: 3, title: "Фильм 3", image: "./images/imgslide/the-witcher-poster-2019-credit-netflix-the-hollywood-archive-2AGAWRY.jpg" },
  { id: 4, title: "Фильм 4", image: "./images/imgslide/titanic-movie-poster-1997-EJWP0H.jpg" },
  { id: 5, title: "Фильм 5", image: "./images/imgslide/the-witcher-poster-2019-credit-netflix-the-hollywood-archive-2AGAWRY.jpg" },
  { id: 6, title: "Фильм 6", image: "./images/imgslide/titanic-movie-poster-1997-EJWP0H.jpg" },
];

const MovieSlider = () => {
    return (
      <>
        <h2 className="latest-movies">Latest Movies</h2>
        <div className="movie-slider-container">
          <Swiper slidesPerView={3} spaceBetween={15} navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]} className="movie-swiper">
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="movie-card">
                  <img src={movie.image} alt={movie.title} />
                  <div className="movie-info">
                    <h2>{movie.title}</h2>
                    <a href={`/movie/${movie.id}`} className="watch-now">Watch Now</a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    );
  };

export default MovieSlider;
