import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./SeriesSlider.css";

const series = [
  { id: 1, title: "Сериал 1", image: "./images/imgslide/the-witcher-poster-2019-credit-netflix-the-hollywood-archive-2AGAWRY.jpg" },
  { id: 2, title: "Сериал 2", image: "./images/imgslide/titanic-movie-poster-1997-EJWP0H.jpg" },
  { id: 3, title: "Сериал 3", image: "./images/imgslide/the-witcher-poster-2019-credit-netflix-the-hollywood-archive-2AGAWRY.jpg" },
  { id: 4, title: "Сериал 4", image: "./images/imgslide/titanic-movie-poster-1997-EJWP0H.jpg" },
  { id: 5, title: "Сериал 5", image: "./images/imgslide/the-witcher-poster-2019-credit-netflix-the-hollywood-archive-2AGAWRY.jpg" },
  { id: 6, title: "Сериал 6", image: "./images/imgslide/titanic-movie-poster-1997-EJWP0H.jpg" },
];

const SeriesSlider = () => {
  return (
    <>
      <h2 className="latest-series">Latest Series</h2>
      <div className="series-slider-container">
        <Swiper slidesPerView={3} spaceBetween={15} navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]} className="series-swiper">
          {series.map((show) => (
            <SwiperSlide key={show.id}>
              <div className="series-card">
                <img src={show.image} alt={show.title} />
                <div className="series-info">
                  <h2>{show.title}</h2>
                  <a href={`/series/${show.id}`} className="watch-now">Watch Now</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SeriesSlider;
