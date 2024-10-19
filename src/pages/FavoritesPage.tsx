import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FilmCard from "../components/FilmCard";
import { Link } from "react-router-dom";
import { clearFavorites } from "../features/favSlice"; 

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch(); 
  const favorites = useSelector((state: any) => state.favMovies.favorites);

  const handleClearAll = () => {
    dispatch(clearFavorites()); 
  };

  return (
    <div className="container mx-auto px-4 mt-5 mb-5 bg-bg dark:bg-darkbg text-black dark:text-white">
      {favorites.length > 0 && (
        <button
          onClick={handleClearAll}
          className="mb-4 px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition"
        >
          Clear All
        </button>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {favorites.length > 0 ? (
          favorites.map((movie: any) => (
            <FilmCard key={movie.id} movie={movie} onClick={() => {}} />
          ))
        ) : (
          <div className="col-span-full text-center p-5 border rounded-lg shadow-lg bg-bg-card dark:bg-darkbg-card">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No Favorite Movies Yet!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Start adding your favorite movies to see them here.
            </p>
            <img
              src="https://www.pngarts.com/files/1/Sad-Heart-PNG-Image.png"
              alt="No favorites illustration"
              className="mx-auto mb-4"
            />
            <Link
              to="/"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-900 text-white rounded transition"
            >
              Browse Movies
            </Link>
          </div>
        )}
      </div>
      {/* {favorites.length > 0 ? <Pagination /> : null} */}
    </div>
  );
};

export default FavoritesPage;
