import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import TvShow from "./components/TvShow";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import PeopleDetails from "./components/PeopleDetails";
import TvDetails from "./components/TvDetails";
import Trailer from "./components/templates/Trailer";
import NotFound from "./components/NotFound";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-screen h-screen bg-[#1f1e24] flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/details/:id" element={<MovieDetails />}>
            <Route path="/movie/details/:id/trailer" element={<Trailer />} />
          </Route>
          <Route path="/tv" element={<TvShow />} />
          <Route path="/tv/details/:id" element={<TvDetails />} >
            <Route path="/tv/details/:id/trailer" element={<Trailer />} />
          
          </Route>e
          <Route path="/person" element={<People />} />
          <Route path="/person/details/:id" element={<PeopleDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
