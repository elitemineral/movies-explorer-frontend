import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies() {
  const movies = useContext(CurrentUserContext).savedMovies;

  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <section className='movies'>
          <MoviesCardList movies={movies} />
        </section>
      </main>
      <Footer />
    </>
  );
}
