import { useContext } from 'react';
import { useCallback, useState } from 'react/cjs/react.development';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { messages } from '../../utils/constants';
import './SearchForm.css';

export default function SearchForm(props) {
  const setModalInfo = useContext(CurrentUserContext).setModalInfo;
  const isOffline = useContext(CurrentUserContext).isOffline;

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

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();

    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    if (!query) {
      setModalInfo({
        text: 'Нужно ввести ключевое слово.',
        code: -1,
      });

      return;
    }

    setQueryString(query);
    handleSearchMovies(query, isShortMovie);
  }, [setModalInfo, isOffline, query, handleSearchMovies, isShortMovie, setQueryString]);

  const handleToggleShortMovie = () => {
    setIsShortMovie(prevValue => {
      lsSetIsShortMovie(!prevValue);
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
