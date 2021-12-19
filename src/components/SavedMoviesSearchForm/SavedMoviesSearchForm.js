import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { lsHelper } from '../../utils/helpers';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMoviesSearchForm() {
  const handleSearchSavedMovies = useContext(CurrentUserContext).handleSearchSavedMovies;

  return (
    <SearchForm
      lsQuery={lsHelper.savedMoviesQueryString}
      lsIsShortMovie={lsHelper.isShortSavedMovie}
      removeQueryString={lsHelper.removeSavedMoviesQueryString}
      setQueryString={lsHelper.setSavedMoviesQueryString}
      handleSearchMovies={handleSearchSavedMovies}
      lsSetIsShortMovie={lsHelper.setIsShortSavedMovie}
    />
  );
}
