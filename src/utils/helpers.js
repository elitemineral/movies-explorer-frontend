import { lsMoviesExplorerKeys } from './constants';

export const lsHelper = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),

  foundFilms: JSON.parse(localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerFoundFilms)),
  queryString: localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerQueryString),
  isShortMovie: localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerIsShortMovie) === 'true',
  counter: localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerCounter),

  setFoundFilms: (value) => JSON.stringify(localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerFoundFilms, value)),
  setQueryString: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerQueryString, value),
  setIsShortMovie: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerIsShortMovie, value),
  setCounter: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerCounter, value),
}
