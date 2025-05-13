import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./SingleMediaPage.css";

const mediaData = [
  {
    id: "1",
    type: "series",
    title: "Сериал 1",
    genre: "Драма, Триллер",
    actors: "Актер 1, Актер 2, Актер 3",
    description: "Захватывающий сериал о таинственных событиях в небольшом городе.",
    image: "./images/series1.jpg",
  },
  {
    id: "2",
    type: "movie",
    title: "Фильм 2",
    genre: "Фантастика, Приключения",
    actors: "Актер A, Актер B, Актер C",
    description: "Эпическое путешествие главного героя в параллельные миры.",
    image: "./images/movie2.jpg",
  },
];

const SingleMediaPage = () => {
  const { type, id } = useParams();
  const media = mediaData.find((item) => item.id === id && item.type === type);

  if (!media) {
    return <h1 style={{ color: "white", textAlign: "center" }}>Контент не найден</h1>;
  }

  return (
    <>
      <Header />
      <div className="single-media-page">
        <div className="media-container">
          <img src={media.image} alt={media.title} className="media-image" />
          <div className="media-info">
            <h1>{media.title}</h1>
            <p><strong>Жанр:</strong> {media.genre}</p>
            <p><strong>Актеры:</strong> {media.actors}</p>
            <p><strong>Описание:</strong> {media.description}</p>
          </div>
        </div>
        <div className="media-player-placeholder">
          <p>🔒 Видео пока недоступно</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleMediaPage;
