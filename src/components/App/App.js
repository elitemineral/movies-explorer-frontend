import Main from '../Main/Main';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { appRoutes, authStatuses, lsMoviesExplorerKeys as lsKeys, messages } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCallback, useEffect, useState } from 'react';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNoFound from '../PageNoFound/PageNoFound';
import Preloader from '../Preloader/Preloader';
import ErrorModalDialog from '../ErrorModalDialog/ErrorModalDialog';
import InfoModalDialog from '../InfoModalDialog/InfoModalDialog';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { lsHelper } from '../../utils/helpers';

const SHORT_MOVIE_DURATION = 40;

function App() {
  const nav = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [authStatus, setAuthStatus] = useState(authStatuses.undefined);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
  const [modalResult, setModalResult] = useState(null);

  const onCloseModalDialog = useCallback(() => {
    setModalResult(null);
  }, []);

  const loadData = useCallback(() => {
    const promises = [mainApi.getUserInfo(), mainApi.getSavedMovies()];

    Promise.all(promises)
      .then(([userInfo, savedMovies]) => {
        setCurrentUser(userInfo);
        setSavedMovies(savedMovies);
        setAuthStatus(authStatuses.loggedIn);

        const foundFilms = lsHelper.foundFilms;
        if (foundFilms) {
          setMovies(foundFilms);
        }
      })
      .catch(() => {
        setAuthStatus(authStatuses.loggedOut);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAuthorize = useCallback(({ email, password }) => {
    mainApi
      .authorize(email, password)
      .then(() => {
        setAuthStatus(authStatuses.loggedIn);
        loadData();
        nav(appRoutes.movies);
      })
      .catch((err) =>
        setModalResult({
          text:
            err.status === 401
              ? messages.authorizeIncorrectDataError
              : messages.authorizeError,
          isError: true,
        })
      );
  }, [nav]);

  const handleRegister = useCallback(({ name, email, password }) => {
    mainApi
      .register(name, email, password)
      .then(() => handleAuthorize({ email, password }))
      .catch((err) =>
        setModalResult({
          text:
            err.status === 409
              ? messages.registerDuplicateError
              : messages.registerError,
          isError: true,
        })
      );
  }, [handleAuthorize]);

  const handleLogout = useCallback(() => {
    mainApi.logout().then(() => {
      setAuthStatus(authStatuses.loggedOut);
      nav(appRoutes.signIn);

    });
  }, [nav]);

  const handleSearchMovies = useCallback((query, isShortMovie) => {
    setIsPreloaderOpen(true);

    moviesApi.getInitialCards()
      .then(res => {
        const movies = res
          .filter(movie => movie.nameRU
            .toUpperCase().includes(query.toUpperCase()) &&
              (isShortMovie ? movie.duration <= SHORT_MOVIE_DURATION : true)
          );

        setMovies(movies);

        // setMoviesCounter(moviesSettings.startCount);
        // setFilteredMovies(movies.slice(0, moviesSettings.startCount));

        //lsHelper.saveMovies(movies, query, isShortMovie, moviesSettings.startCount);
        lsHelper.setFoundFilms(JSON.stringify(movies));
        lsHelper.setCounter(12);
      })
      .catch(() => setModalResult({
        text: messages.serverError,
        isError: true,
      }))
      .finally(() => setIsPreloaderOpen(false));
  }, [setModalResult]);

  return (
    <CurrentUserContext.Provider
      value={{
        authStatus,
        movies,
        savedMovies,
        handleRegister,
        handleAuthorize,
        handleLogout,
        setModalResult,
        handleSearchMovies
      }}
    >
      <Routes>
        <Route path={appRoutes.root} element={<Main />} />
        <Route path={appRoutes.signUp} element={<Register />} />
        <Route path={appRoutes.signIn} element={<Login />} />

        <Route
          path={appRoutes.movies}
          element={
            <RequireAuth>
              <Movies />
            </RequireAuth>
          }
        />

        <Route
          path={appRoutes.savedMovies}
          element={
            <RequireAuth>
              <SavedMovies />
            </RequireAuth>
          }
        />

        <Route
          path={appRoutes.profile}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route path='*' element={<PageNoFound />} />
      </Routes>

      <Preloader isOpen={isPreloaderOpen} />

      <ErrorModalDialog data={modalResult} onClose={onCloseModalDialog} />

      <InfoModalDialog data={modalResult} onClose={onCloseModalDialog} />
    </CurrentUserContext.Provider>
  );

  function RequireAuth({ children }) {
    switch (authStatus) {
      case authStatuses.undefined:
        return null;
      case authStatuses.loggedIn:
        return children;
      default:
        return (
          <Navigate to={appRoutes.root} />
        );
    }
  }
}

export default App;
