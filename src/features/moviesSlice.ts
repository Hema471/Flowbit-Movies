import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  rate: number;
  trailer_key: string;
}

interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  status: "idle" | "loading" | "failed";
}
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
if (!API_KEY) {
  alert("Missing Api Key");
}
const GENRE_ID = 16; // Animation Genre
let PAGE_NUM = 1;
const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${PAGE_NUM}&with_genres=${GENRE_ID}`;
const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  status: "idle",
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(URL);
  console.log("hemaaaa", response);
  return response.data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    rate: movie.vote_average,
    genre: movie.genre_ids,
  }));
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { selectMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
