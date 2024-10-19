import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title?: string | "";
  name: string;
  overview: string;
  poster_path: string;
  release_date: string;
  rate: number;
  genre: number[];
}

interface MoviesState {
  favorites: Movie[];
}

const initialState: MoviesState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearFavorites(state) {
      state.favorites = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favSlice.actions;
export default favSlice.reducer;
