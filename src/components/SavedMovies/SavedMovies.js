import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedMoviesSearchForm from '../SavedMoviesSearchForm/SavedMoviesSearchForm';

export default function SavedMovies() {
  const movies = useContext(CurrentUserContext).filteredSavedMovies;
  const isEmptyResult = useContext(CurrentUserContext).isEmptySavedResult;

  return (
    <>
      <Header />
      <main>
        <SavedMoviesSearchForm />
        <section className='movies'>
          {isEmptyResult ? (
            <p className='movies__not-found'>Ничего не найдено</p>
          ) : (
            <MoviesCardList
              movies={movies}
            />)
          }
        </section>
      </main>
      <Footer />
    </>
  );
}
