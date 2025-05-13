import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../pages/Series.css"

const series = [
    { id: 1, title: "Сериал 1", image: "./images/series/series1.jpg" },
    { id: 2, title: "Сериал 2", image: "./images/series/series2.jpg" },
    { id: 3, title: "Сериал 3", image: "./images/series/series3.jpg" },
    { id: 4, title: "Сериал 4", image: "./images/series/series4.jpg" },
    { id: 5, title: "Сериал 5", image: "./images/series/series5.jpg" },
    { id: 6, title: "Сериал 6", image: "./images/series/series6.jpg" },
    { id: 7, title: "Сериал 7", image: "./images/series/series7.jpg" },
    { id: 8, title: "Сериал 8", image: "./images/series/series8.jpg" },
    { id: 9, title: "Сериал 9", image: "./images/series/series9.jpg" },
    { id: 10, title: "Сериал 10", image: "./images/series/series10.jpg" },
    { id: 11, title: "Сериал 11", image: "./images/series/series11.jpg" },
    { id: 12, title: "Сериал 12", image: "./images/series/series12.jpg" },
    { id: 13, title: "Сериал 13", image: "./images/series/series13.jpg" },
    { id: 14, title: "Сериал 14", image: "./images/series/series14.jpg" },
    { id: 15, title: "Сериал 15", image: "./images/series/series15.jpg" },
    { id: 16, title: "Сериал 16", image: "./images/series/series16.jpg" },
    { id: 17, title: "Сериал 17", image: "./images/series/series17.jpg" },
    { id: 18, title: "Сериал 18", image: "./images/series/series18.jpg" },
    { id: 19, title: "Сериал 19", image: "./images/series/series19.jpg" },
    { id: 20, title: "Сериал 20", image: "./images/series/series20.jpg" },
  ];
  
  const Series = () => {
    return (
      <>
        <Header />
        <div className="series-page">
          <div className="series-grid">
            {series.map((show) => (
              <div key={show.id} className="series-card">
                <img src={show.image} alt={show.title} />
                <h2>{show.title}</h2>
                <a href={`/${show.type}/${show.id}`} className="watch-now">Watch Now</a>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  };
  
export default Series;
