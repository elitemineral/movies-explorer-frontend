import Main from '../Main/Main';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { appRoutes, authStatuses, messages, moviesApiBaseUrl } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCallback, useEffect, useState } from 'react';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNoFound from '../PageNoFound/PageNoFound';
import Preloader from '../Preloader/Preloader';
import ModalDialog from '../ModalDialog/ModalDialog';
import mainApi from '../../utils/MainApi';
import { lsHelper } from '../../utils/helpers';
import MoviesApi from '../../utils/MoviesApi';

const SHORT_MOVIE_DURATION = 40;

function App() {
  const nav = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const [isEmptySavedResult, setIsEmptySavedResult] = useState(false);
  const [authStatus, setAuthStatus] = useState(authStatuses.undefined);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  const onCloseModalDialog = useCallback(() => {
    setModalInfo(null);
  }, []);

  const loadData = useCallback(() => {
    const promises = [mainApi.getUserInfo(), mainApi.getSavedMovies()];

    Promise.all(promises)
      .then(([userInfo, savedMovies]) => {
        setCurrentUser(userInfo);

        const foundMovies = lsHelper.foundMovies();
        if (foundMovies) {
          setMovies(foundMovies);
        }

        const newSavedMovies = savedMovies.map(savedMovie => {
          return  {
            ...savedMovie,
            isSaved: true,
          }
        });
        setSavedMovies(newSavedMovies);

        const foundSavedMovies = lsHelper.foundSavedMovies();
        if (foundSavedMovies) {
          setFilteredSavedMovies(foundSavedMovies);
        } else {
          setFilteredSavedMovies(newSavedMovies);
        }

        setAuthStatus(authStatuses.loggedIn);
      })
      .catch(() => setAuthStatus(authStatuses.loggedOut));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, [loadData]);

  const handleAuthorize = useCallback(({ email, password }) => {
    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    mainApi
      .authorize(email, password)
      .then(() => {
        loadData();
        setAuthStatus(authStatuses.loggedIn);
        nav(appRoutes.movies);
      })
      .catch(err => {
        setModalInfo({ code: err.code })
      });
  }, [loadData, nav, isOffline]);

  const handleRegister = useCallback(({ name, email, password }) => {
    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    mainApi
      .register(name, email, password)
      .then(() => {
        handleAuthorize({ email, password })
      })
      .catch(err => {
        setModalInfo({ code: err.code })
      });
  }, [handleAuthorize, setModalInfo, isOffline]);

  const handleLogout = useCallback(() => {
    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    mainApi.logout()
      .then(() => {
        setAuthStatus(authStatuses.loggedOut);
        nav(appRoutes.signIn);
        setMovies([]);
        lsHelper.removeMoviesSetting();
        lsHelper.removeSavedMoviesSetting();
      })
      .catch(err => setModalInfo({ code: err.code }));
  }, [nav, isOffline]);

  const handleUpdateUser = useCallback((name, email) => {
    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    mainApi.setUserInfo(name, email)
    .then(userInfo => {
      setCurrentUser(userInfo);
      setModalInfo({ text: messages.successfulUpdate });
    })
    .catch(err => setModalInfo({ code: err.code }));
  }, [isOffline]);

  const handleMovieDelete = useCallback((movie) => {
    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    let id;
    let movieId;

    if (movie.isSaved) {
      id = movie._id;
      movieId = movie.movieId;
    } else {
      id = savedMovies.find(savedMovie => savedMovie.movieId === movie.id)._id;
      movieId = movie.id;
    }

    mainApi.deleteMovie(id)
      .then(() => {
        setMovies(prevMovies => {
          const newMovies = prevMovies.map(prevMovie => prevMovie.id !== movieId ? prevMovie : {...prevMovie, isLiked: false });

          lsHelper.setFoundMovies(newMovies);
          return newMovies;
        });

        const newSavedMovies = savedMovies.filter(savedMovie => savedMovie._id !== id);
        setSavedMovies(newSavedMovies);

        const query = lsHelper.savedMoviesQueryString() ?? '';
        const isShortMovie = lsHelper.isShortSavedMovie() ?? false;

        const newFilteredSavedMovies = newSavedMovies
          .filter(movie => movie.nameRU.toUpperCase()
            .includes(query.toUpperCase()) &&
              (isShortMovie ? movie.duration <= SHORT_MOVIE_DURATION : true)
          );

        setFilteredSavedMovies(newFilteredSavedMovies);
      })
      .catch(err => {
        setModalInfo({ code: err.code })
      });
  }, [savedMovies, isOffline]);

  const handleMovieLike = useCallback((movie) => {
    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    if (movie.isLiked) {
      handleMovieDelete(movie);
    } else {
      mainApi.saveMovie({...movie,
        movieId: movie.id,
      })
        .then(savedMovie => {
          setMovies(prevMovies => {
            const newMovies = prevMovies.map(prevMovie => prevMovie.id !== movie.id ? prevMovie : {...prevMovie, isLiked: true });

            lsHelper.setFoundMovies(newMovies);
            return newMovies;
          });

          const newSavedMovies = [...savedMovies, { ...savedMovie, isSaved: true }];
          setSavedMovies(newSavedMovies);

          const query = lsHelper.savedMoviesQueryString() ?? '';
          const isShortMovie = lsHelper.isShortSavedMovie() ?? false;

          const newFilteredSavedMovies = newSavedMovies
            .filter(movie => movie.nameRU.toUpperCase()
              .includes(query.toUpperCase()) &&
                (isShortMovie ? movie.duration <= SHORT_MOVIE_DURATION : true)
            );

          setFilteredSavedMovies(newFilteredSavedMovies);
        })
        .catch(err => setModalInfo({ code: err.code  }));
    }
  }, [handleMovieDelete, savedMovies, isOffline]);

  const handleSearchMovies = useCallback((query, isShortMovie) => {
    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    setIsPreloaderOpen(true);

    MoviesApi.getMovies()
      .then(res => {
        const movies = res
          .filter(movie => movie.nameRU.toUpperCase()
            .includes(query.toUpperCase()) &&
              (isShortMovie ? movie.duration <= SHORT_MOVIE_DURATION : true)
          )
          .map(movie => ({
            ...movie,
            isLiked: savedMovies.some(savedMovie => savedMovie.movieId === movie.id),
            image: `${moviesApiBaseUrl}${movie.image.url}`,
            thumbnail: `${moviesApiBaseUrl}${movie.image.formats.thumbnail.url}`,
            trailer: movie.trailerLink,
          }));

        setMovies(movies);
        setIsEmptyResult(movies.length === 0);
        lsHelper.setFoundMovies(movies);
        lsHelper.removeMoviesCounter();
      })
      .catch(err => setModalInfo({ code: err.code }))
      .finally(() => setIsPreloaderOpen(false));
  }, [savedMovies, setModalInfo, isOffline]);

  const handleSearchSavedMovies = useCallback((query, isShortMovie) => {
    const newFilteredSavedMovies = savedMovies
      .filter(movie => movie.nameRU.toUpperCase()
        .includes(query.toUpperCase()) &&
          (isShortMovie ? movie.duration <= SHORT_MOVIE_DURATION : true)
      );

      setFilteredSavedMovies(newFilteredSavedMovies);
      setIsEmptySavedResult(newFilteredSavedMovies.length === 0);
      lsHelper.setFoundSavedMovies(newFilteredSavedMovies);
  }, [savedMovies]);

  return (
    <CurrentUserContext.Provider
      value={{
        authStatus,
        currentUser,
        movies,
        filteredSavedMovies,
        handleRegister,
        handleAuthorize,
        handleLogout,
        handleUpdateUser,
        handleSearchMovies,
        handleSearchSavedMovies,
        handleMovieLike,
        handleMovieDelete,
        isEmptyResult,
        isEmptySavedResult,
        setModalInfo,
      }}
    >
      <Routes>
        <Route path={appRoutes.root} element={<Main />} />

        <Route
          path={appRoutes.signUp}
          element={
            <DoNotRequireAuth>
              <Register />
            </DoNotRequireAuth>
          }
        />

        <Route
          path={appRoutes.signIn}
          element={
            <DoNotRequireAuth>
              <Login />
            </DoNotRequireAuth>
          }
        />

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

      <ModalDialog modalInfo={modalInfo} onClose={onCloseModalDialog} />
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

  function DoNotRequireAuth({ children }) {
    switch (authStatus) {
      case authStatuses.undefined:
        return null;
      case authStatuses.loggedOut:
        return children;
      default:
        return (
          <Navigate to={appRoutes.movies} />
        );
    }
  }
}

export default App;
