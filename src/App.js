import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminPanel from "./pages/Admin/AdminPanel";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import HomePage from "./pages/HomePage/HomePage";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import MovieDetails from "./pages/SinglePages/MovieDetails";
import SeriesDetails from "./pages/SinglePages/SeriesDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
