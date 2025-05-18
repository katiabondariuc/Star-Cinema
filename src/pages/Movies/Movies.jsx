import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Movies.css";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    const API_KEY = process.env.REACT_APP_TMDB_BEARER;
    console.log("API_KEY:", API_KEY);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                if (json.results) {
                    setMovies(json.results);
                }
            })
            .catch((err) => console.error("Error fetching movies:", err));
    }, [API_KEY]);

    return (
        <>
            <Header />
            <div className="movies-page">
                <h1>Popular Movies</h1>
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h2>{movie.title}</h2>
                            <a href={`/movies/${movie.id}`} className="watch-now">
                                Watch Now
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Movies;
