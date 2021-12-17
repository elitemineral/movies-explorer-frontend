import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Movies.css';

export default function Movies() {
  const movies = useContext(CurrentUserContext).movies;

  const getMoviesSettings = useCallback(() => {
    const width = window.innerWidth;

    let startingCounter;
    let moviesPerLine;

    if (width < 768) {
      startingCounter = 5;
      moviesPerLine = 2;
    } else {
      if (width < 1280) {
        startingCounter = 8;
        moviesPerLine = 2;
      } else {
        startingCounter = 12;
        moviesPerLine = 3;
      }
    }

    return {
      startingCounter,
      moviesPerLine,
    };
  }, []);

  const initialSetting = useMemo(() => getMoviesSettings(), [getMoviesSettings]);
  const [filteredMovies, setFilteredMovies] = useState(movies.slice(0, initialSetting.startingCounter));
  const [moviesSettings, setMoviesSettings] = useState(initialSetting);

  const resizeWindow = useCallback(() => {
    const newMoviesSettings = getMoviesSettings();

    if ((newMoviesSettings.moviesPerLine !== moviesSettings.moviesPerLine) ||
        (newMoviesSettings.startingCounter !== moviesSettings.startingCounter)) {
          setMoviesSettings(newMoviesSettings);
    }
  }, [getMoviesSettings, moviesSettings]);

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, [resizeWindow]);

  const handleBtnMoreClick = useCallback(() => {
    setFilteredMovies(prevMovies => [...prevMovies, ...movies.slice(prevMovies.length, prevMovies.length + moviesSettings.moviesPerLine)]);
  }, [movies, moviesSettings]);

  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <section className='movies'>
          <MoviesCardList
            movies={filteredMovies}
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
