import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({ cards }) {
  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <section className='cards'>
          <MoviesCardList cards={[]} />
        </section>
      </main>
      <Footer />
    </>
  );
}
