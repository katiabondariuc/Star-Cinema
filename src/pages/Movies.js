import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../pages/Movies.css"

const movies = [
    { id: 1, title: "Фильм 1", image: "./images/movies/movie1.jpg" },
    { id: 2, title: "Фильм 2", image: "./images/movies/movie2.jpg" },
    { id: 3, title: "Фильм 3", image: "./images/movies/movie3.jpg" },
    { id: 4, title: "Фильм 4", image: "./images/movies/movie4.jpg" },
    { id: 5, title: "Фильм 5", image: "./images/movies/movie5.jpg" },
    { id: 6, title: "Фильм 6", image: "./images/movies/movie6.jpg" },
    { id: 7, title: "Фильм 7", image: "./images/movies/movie7.jpg" },
    { id: 8, title: "Фильм 8", image: "./images/movies/movie8.jpg" },
    { id: 9, title: "Фильм 9", image: "./images/movies/movie9.jpg" },
    { id: 10, title: "Фильм 10", image: "./images/movies/movie10.jpg" },
    { id: 11, title: "Фильм 11", image: "./images/movies/movie11.jpg" },
    { id: 12, title: "Фильм 12", image: "./images/movies/movie12.jpg" },
    { id: 13, title: "Фильм 13", image: "./images/movies/movie13.jpg" },
    { id: 14, title: "Фильм 14", image: "./images/movies/movie14.jpg" },
    { id: 15, title: "Фильм 15", image: "./images/movies/movie15.jpg" },
    { id: 16, title: "Фильм 16", image: "./images/movies/movie16.jpg" },
    { id: 16, title: "Фильм 17", image: "./images/movies/movie16.jpg" },
    { id: 16, title: "Фильм 18", image: "./images/movies/movie16.jpg" },
    { id: 16, title: "Фильм 19", image: "./images/movies/movie16.jpg" },
    { id: 16, title: "Фильм 20", image: "./images/movies/movie16.jpg" },
  ];
  
  const Movies = () => {
    return (
      <>
        <Header />
        <div className="movies-page">
          <div className="movies-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.image} alt={movie.title} />
                <h2>{movie.title}</h2>
                <a href={`/movies/${movie.id}`} className="watch-now">Watch Now</a>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  };
  
  export default Movies;