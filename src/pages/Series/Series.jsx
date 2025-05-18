import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Series.css";

const Series = () => {
    const [series, setSeries] = useState([]);

    const API_KEY = process.env.REACT_APP_TMDB_BEARER;

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                if (json.results) {
                    setSeries(json.results);
                }
            })
            .catch((err) => console.error("Error fetching series:", err));
    }, [API_KEY]);

    return (
        <>
            <Header />
            <div className="series-page">
                <h1>Popular Series</h1>
                <div className="series-grid">
                    {series.map((show) => (
                        <div key={show.id} className="series-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                alt={show.name}
                            />
                            <h2>{show.name}</h2>
                            <a href={`/series/${show.id}`} className="watch-now">
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

export default Series;
