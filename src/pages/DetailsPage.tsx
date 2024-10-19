import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetails,
  clearSelectedMovie,
} from "../features/movieDetailsSlice";
import { RootState } from "../store/store";
import { useParams, Link } from "react-router-dom";
import MainLoader from "../components/Loaders/MainLoader";

const MovieDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { movie, status } = useSelector(
    (state: RootState) => state.movieDetails
  );
  const { filmId } = useParams<{ filmId: any }>();

  useEffect(() => {
    if (filmId) {
      //@ts-ignore
      dispatch(fetchMovieDetails(filmId));
    }

    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, filmId]);

  if (status === "loading") {
    return <MainLoader />;
  }

  if (status === "failed") {
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Error fetching movie details for ID: {filmId}.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-bg dark:bg-darkbg text-black dark:text-white">
      {movie && (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">{movie.title}</h1>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <div className="md:w-1/3 flex justify-center">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>

            {/* Movie Details */}
            <div className="md:w-2/3">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {movie.overview}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Release Date: </span>
                {movie.release_date}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                <span className="font-semibold">Rating: </span>
                {movie.rate}
              </p>

              {/* Movie Trailer */}
              {movie.trailer_key ? (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Watch Trailer</h2>
                  <iframe
                    className="w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-md"
                    src={`https://www.youtube.com/embed/${movie.trailer_key}?mute=1`}
                    title="Movie Trailer"
                    allowFullScreen
                  ></iframe>

                  <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 text-white font-bold py-2 px-4 rounded flex justify-center items-center mt-10"
                  >
                    View Similar Movies
                  </Link>
                </div>
              ) : (
                <div className="mt-6 text-center">
                  <h1 className="text-red-500 dark:text-red-400 text-2xl font-bold mb-4">
                    Trailer Not Available
                  </h1>
                  <img
                    src="https://via.placeholder.com/600x400?text=Trailer+Not+Available"
                    alt="Trailer Not Available"
                    className="mx-auto mb-4 rounded-lg shadow-md"
                  />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Sorry, the trailer for this movie is currently unavailable.
                    Check out the movie synopsis below or explore similar
                    titles.
                  </p>
                  <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                  >
                    View Similar Movies
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
