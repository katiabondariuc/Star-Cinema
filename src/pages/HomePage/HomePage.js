import React from "react";
import Header from "../../components/Header/Header";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import SeriesSlider from "../../components/SeriesSlider/SeriesSlider";
import Footer from "../../components/Footer/Footer"
import HeaderSlider from "../../components/HeaderSlider/HeaderSlider";

function HomePage() {
  return (
    <div className="HomePage">
      <Header />
      <HeaderSlider />
      <MovieSlider />
      <SeriesSlider />
      <Footer />
    </div>
  );
}

export default HomePage;
