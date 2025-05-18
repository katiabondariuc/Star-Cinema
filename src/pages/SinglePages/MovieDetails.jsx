import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./details.css";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const API_KEY = process.env.REACT_APP_TMDB_BEARER;

    useEffect(() => {
        // Запрос для получения информации о фильме
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((err) => console.error("Error loading movie:", err));

        // Запрос для получения трейлеров
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setTrailer(data.results[0]); // Берем первый трейлер
                }
            })
            .catch((err) => console.error("Error loading trailer:", err));
    }, [id, API_KEY]);

    if (!movie) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <div className="details-page">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="details-info">
                    <h1>{movie.title}</h1>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average} / 10</p>

                    {/* Если есть трейлер, показываем его */}
                    {trailer && (
                        <div className="trailer">
                            <h3>Watch Trailer</h3>
                            <iframe
                                width="100%"
                                height="400px"
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title="Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MovieDetails;
