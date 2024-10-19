import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice";
import movieDetailsReducer from "../features/movieDetailsSlice";
import favReducer  from "../features/favSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    favMovies: favReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
