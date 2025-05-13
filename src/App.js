import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Series from "./pages/Series";
import Movies from "./pages/Movies";
import SingleMediaPage from "./pages/SingleMediaPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/:type/:id" element={<SingleMediaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
