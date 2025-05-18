import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Series from "./pages/Series/Series";
import Movies from "./pages/Movies/Movies";
import SeriesDetails from "./pages/SinglePages/SeriesDetails";
import MovieDetails from "./pages/SinglePages/MovieDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movies" element={<Movies />} />
          <Route path="/series/:id" element={<SeriesDetails />} />
          <Route path="/movies/:id" element={<MovieDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
