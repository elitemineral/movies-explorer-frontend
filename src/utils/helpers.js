import { lsMoviesExplorerKeys } from './constants';

export const lsHelper = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),

  foundFilms: () => JSON.parse(localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerFoundMovies)),
  queryString: () => localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerQueryString),
  isShortMovie: () => localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerIsShortMovie) === 'true',
  moviesCounter: () => localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerCounter),

  setFoundFilms: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerFoundMovies, JSON.stringify(value)),
  setQueryString: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerQueryString, value),
  setIsShortMovie: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerIsShortMovie, value),
  setMoviesCounter: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerCounter, value),

  removeQueryString: () => localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerQueryString),
  removeMoviesCounter: () => localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerCounter),
  removeMoviesSetting: () => {
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerFoundMovies);
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerQueryString);
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerIsShortMovie);
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerCounter);
  }
}
