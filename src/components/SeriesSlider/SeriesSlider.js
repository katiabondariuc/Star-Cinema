import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./SeriesSlider.css";

const SeriesSlider = () => {
    const [series, setSeries] = useState([]);
    const API_KEY = process.env.REACT_APP_TMDB_BEARER;

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
                const res = await fetch(url);
                const data = await res.json();
                if (data.results) {
                    setSeries(data.results);
                }
            } catch (error) {
                console.error("Error fetching series:", error);
            }
        };

        fetchSeries();
    }, [API_KEY]);

    return (
        <>
            <h2 className="latest-series">Latest Series</h2>
            <div className="series-slider-container">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={15}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="series-swiper"
                >
                    {series.map((show) => (
                        <SwiperSlide key={show.id}>
                            <div className="series-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                    alt={show.name}
                                />
                                <div className="series-info">
                                    <h2>{show.name}</h2>
                                    <a href={`/series/${show.id}`} className="watch-now">
                                        Watch Now
                                    </a>
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
