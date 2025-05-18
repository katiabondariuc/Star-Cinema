import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./details.css";

const SeriesDetails = () => {
    const { id } = useParams();
    const [series, setSeries] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const API_KEY = process.env.REACT_APP_TMDB_BEARER;

    useEffect(() => {
        // Запрос для получения информации о сериале
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((data) => setSeries(data))
            .catch((err) => console.error("Error loading series:", err));

        // Запрос для получения трейлеров
        fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setTrailer(data.results[0]); // Берем первый трейлер
                }
            })
            .catch((err) => console.error("Error loading trailer:", err));
    }, [id, API_KEY]);

    if (!series) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <div className="details-page">
                <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} />
                <div className="details-info">
                    <h1>{series.name}</h1>
                    <p><strong>Overview:</strong> {series.overview}</p>
                    <p><strong>First Air Date:</strong> {series.first_air_date}</p>
                    <p><strong>Rating:</strong> {series.vote_average} / 10</p>

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

export default SeriesDetails;
