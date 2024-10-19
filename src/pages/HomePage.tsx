import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectMovie } from "../features/moviesSlice";
import { RootState, AppDispatch } from "../store/store";
import FilmCard from "../components/FilmCard";
// import Pagination from "../components/Pagination";
import MainLoader from "../components/Loaders/MainLoader";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, status } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleCardClick = (movie: any) => {
    dispatch(selectMovie(movie));
    // console.log("hemaaa", movie);
  };

  if (status === "loading") return <MainLoader />;
  if (status === "failed") return <div>Error loading movies.</div>;

  return (
    <div className="container mx-auto px-4 mt-5 mb-5 bg-bg dark:bg-darkbg text-black dark:text-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {movies?.map((movie) => (
          <Link key={movie.id} to={`/details/${movie.id}`}>
            <FilmCard movie={movie} onClick={() => handleCardClick(movie)} />
          </Link>
        ))}
      </div>
      {/* {movies?.length > 0 ? <Pagination /> : null} */}
    </div>
  );
};

export default HomePage;
