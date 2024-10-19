import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  rate: number;
  trailer_key: string | null;
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
}

interface MovieDetailsState {
  movie: MovieDetails | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const initialState: MovieDetailsState = {
  movie: null,
  status: "idle",
  error: null,
};

export const fetchMovieDetails = createAsyncThunk<MovieDetails, number>(
  "movieDetails/fetchMovieDetails",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
      );

      return {
        id: response.data.id,
        title: response.data.title,
        overview: response.data.overview,
        poster_path: response.data.poster_path,
        release_date: response.data.release_date,
        rate: response.data.vote_average,
        trailer_key: response.data.videos?.results?.[0]?.key ?? null,
        videos: response.data.videos,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.status_message || "Failed to fetch movie details"
      );
    }
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.movie = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = "idle";
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedMovie } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
