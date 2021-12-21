import { useState } from 'react';
import { lsMoviesExplorerKeys } from './constants';
import validator from 'validator';

export function useForm(initialValues = {}) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormValues({ ...formValues, [name]: value });
  };

  return { formValues, handleChange, setFormValues };
}

export const validators = {
  name: {
    required: (value) => { return value === ''; },
    minLength: (value) => { return value && value.length < 2; },
    onlyAllowedSymbols: (value) => { return value && /[^а-яА-Яa-zA-Z- ]/.test(value); },
  },
  email: {
    required: (value) => { return value === ''; },
    isEmail: (value) => { return value && !validator.isEmail(value); },
  },
  password: {
    required: (value) => { return value === ''; },
    minLength: (value) => { return value && value.length < 8; },
  },
}

export const lsHelper = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),

  foundMovies: () => JSON.parse(localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerFoundMovies)),
  moviesQueryString: () => localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerMoviesQueryString),
  isShortMovie: () => localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerIsShortMovie) === 'true',
  moviesCounter: () => localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerMoviesCounter),

  setFoundMovies: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerFoundMovies, JSON.stringify(value)),
  setMoviesQueryString: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerMoviesQueryString, value),
  setIsShortMovie: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerIsShortMovie, value),
  setMoviesCounter: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerMoviesCounter, value),

  removeMoviesQueryString: () => localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerMoviesQueryString),
  removeMoviesCounter: () => localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerMoviesCounter),
  removeMoviesSetting: () => {
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerFoundMovies);
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerMoviesQueryString);
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerIsShortMovie);
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerMoviesCounter);
  },

  foundSavedMovies: () => JSON.parse(localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerFoundSavedMovies)),
  savedMoviesQueryString: () => localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerSavedMoviesQueryString),
  isShortSavedMovie: () => localStorage.getItem(lsMoviesExplorerKeys.moviesExplorerIsShortSavedMovie) === 'true',

  setFoundSavedMovies: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerFoundSavedMovies, JSON.stringify(value)),
  setSavedMoviesQueryString: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerSavedMoviesQueryString, value),
  setIsShortSavedMovie: (value) => localStorage.setItem(lsMoviesExplorerKeys.moviesExplorerIsShortSavedMovie, value),

  removeSavedMoviesQueryString: () => localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerSavedMoviesQueryString),
  removeSavedMoviesSetting: () => {
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerFoundSavedMovies);
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerSavedMoviesQueryString);
    localStorage.removeItem(lsMoviesExplorerKeys.moviesExplorerIsShortSavedMovie);
  },
}
