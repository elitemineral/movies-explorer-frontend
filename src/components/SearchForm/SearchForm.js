import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SearchForm.css';

export default function SearchForm(props) {
  const setModalInfo = useContext(CurrentUserContext).setModalInfo;

  const {
    lsQuery,
    lsIsShortMovie,
    setQueryString,
    handleSearchMovies,
    lsSetIsShortMovie
  } = props;

  const [query, setQuery] = useState(lsQuery);
  const [isShortMovie, setIsShortMovie] = useState(lsIsShortMovie);

  const handleQueryChange = (evt) => {
    setQuery(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!query) {
      setModalInfo({
        text: 'Нужно ввести ключевое слово.',
        code: -1,
      });

      return;
    }

    setQueryString(query);
    handleSearchMovies(query, isShortMovie);
  }

  const handleToggleShortMovie = () => {
    if (!query) {
      setModalInfo({
        text: 'Нужно ввести ключевое слово.',
        code: -1,
      });

      return;
    }

    setIsShortMovie(prevValue => {
      lsSetIsShortMovie(!prevValue);
      setQueryString(query);

      handleSearchMovies(query, !prevValue);
      return !prevValue;
    });
  }

  return (
    <section className='search'>
      <form className='form search-form' name='search-form' onSubmit={handleSubmit}>
        <fieldset className='search-form__container'>
          <div className='search-form__loupe' />
          <input className='search-form__input' name='movie' type='text' placeholder='Фильм' value={query || ''} onChange={handleQueryChange} />
          <button className='button form__button-submit' type='submit'>Найти</button>
        </fieldset>
        <label className='search-form__switcher-label'>
          <input className='search-form__switcher' name='short-movie' type='checkbox' checked={isShortMovie} onChange={handleToggleShortMovie} />
          Короткометражки
        </label>
      </form>
    </section>
  );
}
