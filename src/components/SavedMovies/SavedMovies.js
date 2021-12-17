import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({ movies }) {
  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <section className='movies'>
          <MoviesCardList movies={[]} />
        </section>
      </main>
      <Footer />
    </>
  );
}
