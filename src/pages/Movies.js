import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../pages/Movies.css";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/account/22018353/rated/movies?language=en-US&page=1&sort_by=created_at.asc';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzhjMDlkYjI4ZGNlMDhhNTk4N2NkMGRlNzc1MTdiYiIsIm5iZiI6MTc0NzU3Mzg2Ny40MzkwMDAxLCJzdWIiOiI2ODI5ZGM2YmY1Y2JmMWQ4NjFlMjQ2NjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vV5sFSXpIhFtnjFJGUtC9UAQ54GQ7GOg0Ws2jq0vW2s'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                if (json.results) {
                    setMovies(json.results);
                }
            })
            .catch(err => console.error('Error fetching movies:', err));
    }, []);

    return (
        <>
            <Header />
            <div className="movies-page">
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
