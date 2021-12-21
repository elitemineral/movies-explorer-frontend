import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { lsHelper } from '../../utils/helpers';
import SearchForm from '../SearchForm/SearchForm';

export default function MoviesSearchForm() {
  const handleSearchMovies = useContext(CurrentUserContext).handleSearchMovies;

  return (
    <SearchForm
      lsQuery={lsHelper.moviesQueryString}
      lsIsShortMovie={lsHelper.isShortMovie}
      removeQueryString={lsHelper.removeMoviesQueryString}
      setQueryString={lsHelper.setMoviesQueryString}
      handleSearchMovies={handleSearchMovies}
      lsSetIsShortMovie={lsHelper.setIsShortMovie}
    />
  );
}
