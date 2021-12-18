import { useContext } from 'react';
import { useCallback, useState } from 'react/cjs/react.development';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { lsHelper } from '../../utils/helpers';
import './SearchForm.css';

export default function SearchForm() {
  const setModalInfo = useContext(CurrentUserContext).setModalInfo;
  const handleSearchMovies = useContext(CurrentUserContext).handleSearchMovies;
  const isOffline = useContext(CurrentUserContext).isOffline;

  const [query, setQuery] = useState(lsHelper.queryString());
  const [isShortMovie, setIsShortMovie] = useState(lsHelper.isShortMovie());

  const handleQueryChange = (evt) => {
    setQuery(evt.target.value);
  }

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();

    if (isOffline) {
      setModalInfo({ text: 'Отсутствует интерент-соединение', code: 200 });
      return;
    }

    if (!query) {
      setModalInfo({
        text: 'Нужно ввести ключевое слово.',
        code: -1,
      });

      lsHelper.removeQueryString();
      return;
    }

    lsHelper.setQueryString(query);
    handleSearchMovies(query, isShortMovie);
  }, [setModalInfo, isOffline, query, handleSearchMovies, isShortMovie]);

  const handleToggleShortMovie = () => {
    setIsShortMovie(prevValue => {
      lsHelper.setIsShortMovie(!prevValue);
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
