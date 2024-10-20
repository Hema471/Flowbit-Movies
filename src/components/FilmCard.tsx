import React from "react";
import { Link } from "react-router-dom";
import CircleRating from "./CircleRating";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favSlice";
import { toast } from "react-toastify";

interface FilmCardProps {
  movie: {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    release_date?: string;
    rate?: number | 0;
    genre?: number[];
    gen?: {};
  };
  onClick: () => void;
}

const gen = {
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  36: "History",
  37: "Western",
  53: "Thriller",
  80: "Crime",
  99: "Documentary",
  878: "Science Fiction",
  9648: "Mystery",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  10770: "TV Movie",
};

const FilmCard: React.FC<FilmCardProps> = ({ movie, onClick }) => {
  const movieTitle = movie.title || movie.name;
  const originalDate = movie.release_date ? moment(movie.release_date) : null;
  const formattedDate = originalDate
    ? originalDate.format("MMM D, YYYY")
    : "Unknown";

  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favMovies.favorites);
  const isFavorite = favorites.some((fav: any) => fav.id === movie.id); // Check if the movie is already in favorites

  const handleClickCard = () => {
    onClick();
  };

  const handleFavoriteToggle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent the card click event from firing

    if (movie && movie.id !== undefined) {
      if (isFavorite) {
        dispatch(removeFavorite(movie.id));
        toast.info("Movie removed from favorites", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        // @ts-ignore
        dispatch(addFavorite(movie));
        toast.success("Movie added to favorites", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      console.error("Movie object or ID is invalid");
    }
  };

  return (
    <Link
      to={`/details/${movie.id}`}
      className="relative w-32 md:w-48 h-auto flex flex-col flex-shrink-0 hover:animate-pulse cursor-pointer scale-[1.1] mt-5 mb-5"
      onClick={handleClickCard}
    >
      {/* Poster and Movie Details */}
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          className="rounded-lg h-48 md:h-72 object-cover"
          loading="lazy"
          alt={movieTitle}
        />
      ) : (
        <div className="w-full h-48 md:h-72 bg-slate-800 rounded-lg flex flex-col justify-center items-center">
          <p className="text-center text-sm md:text-base">
            No poster available
          </p>
        </div>
      )}

      <div className="relative h-auto w-full flex flex-col text-sm md:text-base pt-8">
        <p className="font-bold">{movieTitle}</p>
        <p className="text-stone-500">{formattedDate}</p>
      </div>

      <div className="absolute top-[168px] md:top-[264px] left-0 h-auto w-full px-0 md:px-1 flex flex-row justify-between items-start">
        <div className="scale-75 md:scale-100">
          <CircleRating rate={movie.rate ?? 0} size="48px" />
        </div>
        <div className="flex flex-row justify-end flex-wrap gap-1 py-1 max-h-[52px] overflow-hidden">
          {movie.genre?.map((id) => (
            <p
              key={id}
              className="text-sm bg-stone-300 opacity-70 text-black px-1 rounded-md max-w-20 md:max-w-none text-center text-ellipsis text-nowrap overflow-hidden"
            >
              {gen[id as keyof typeof gen]}
            </p>
          ))}
        </div>
      </div>

      {/* Gold clickable star */}
      <div
        className={`absolute top-2 right-2 cursor-pointer ${
          isFavorite ? "text-yellow-500" : "text-gray-500"
        }`}
        onClick={handleFavoriteToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 17.25l-5.716 3.008a.75.75 0 01-1.089-.787l1.09-6.36L2.136 9.53a.75.75 0 01.416-1.278l6.373-.927 2.85-5.773a.75.75 0 011.348 0l2.85 5.773 6.373.927a.75.75 0 01.416 1.278l-4.618 4.58 1.09 6.36a.75.75 0 01-1.089.787L12 17.25z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
};

export default FilmCard;
