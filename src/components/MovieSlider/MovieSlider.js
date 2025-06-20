import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./MovieSlider.css";

const MovieSlider = () => {
    const [movies, setMovies] = useState([]);
    const API_KEY = process.env.REACT_APP_TMDB_BEARER;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
                const res = await fetch(url);
                const data = await res.json();
                if (data.results) {
                    setMovies(data.results);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, [API_KEY]);

    return (
        <>
            <h2 className="latest-movies">Latest Movies</h2>
            <div className="movie-slider-container">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={15}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="movie-swiper"
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <div className="movie-info">
                                    <h2>{movie.title}</h2>
                                    <a href={`/movie/${movie.id}`} className="watch-now">
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

export default MovieSlider;
