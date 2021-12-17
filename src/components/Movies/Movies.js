import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import moviesApi from '../../utils/MoviesApi';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { lsMoviesExplorerKeys as lsKeys, messages } from '../../utils/constants';
import './Movies.css';
import { lsHelper } from '../../utils/helpers';

// const SHORT_MOVIE_DURATION = 40;

export default function Movies() {
  const movies = useContext(CurrentUserContext).movies;

  const getMoviesSettings = useCallback(() => {
    const width = window.innerWidth;

    let startCount;
    let lineLength;

    if (width < 768) {
      startCount = 5;
      lineLength = 2;
    } else {
      if (width < 1280) {
        startCount = 8;
        lineLength = 2;
      } else {
        startCount = 12;
        lineLength = 3;
      }
    }

    const initialCounter = lsHelper.getItem(lsKeys.moviesExplorerCounter);

    return {
      startCount: initialCounter ?? startCount,
      lineLength,
    };
  }, []);

  const initialSetting = useMemo(() => getMoviesSettings(), [getMoviesSettings]);
  const [filteredMovies, setFilteredMovies] = useState(movies.slice(0, initialSetting.startCount));
  const [moviesSettings, setMoviesSettings] = useState(initialSetting);

  const resizeWindow = useCallback(() => {
    const newCardsSetting = getMoviesSettings();
    if ((newCardsSetting.lineLength !== moviesSettings.lineLength) ||
        (newCardsSetting.startCount !== moviesSettings.startCount)) {
          setMoviesSettings(newCardsSetting);
    }
  }, [getMoviesSettings, moviesSettings]);

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, [resizeWindow]);

  const handleBtnMoreClick = useCallback(() => {
    setFilteredMovies(prevCards => {
      localStorage.setItem('moviesExplorerCounter', prevCards.length + moviesSettings.lineLength);
      return [...prevCards, ...movies.slice(prevCards.length, prevCards.length + moviesSettings.lineLength)]
    });
  }, [movies, moviesSettings]);

  // const onMovieLike = useCallback((movieId) => {
  //   const movie = movies.find(movie => movie.id === movieId);
  //   movie.isLiked = true;

  //   localStorage.setItem('moviesExplorerFoundFilms', JSON.stringify(movies));
  // }, [movies]);

  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <section className='movies'>
          <MoviesCardList
            movies={filteredMovies}
            // onMovieLike={onMovieLike}
          />
          {filteredMovies.length < movies.length && (
            <button className='button movies__button-more' onClick={handleBtnMoreClick}>Ещё</button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
