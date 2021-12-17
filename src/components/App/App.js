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

        const foundFilms = lsHelper.foundFilms();
        if (foundFilms) {
          setMovies(foundFilms);
        }
      })
      .catch(() => setAuthStatus(authStatuses.loggedOut));
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
  }, [loadData, nav]);

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
    mainApi.logout()
      .then(() => {
        setAuthStatus(authStatuses.loggedOut);
        nav(appRoutes.signIn);
      })
      .catch(err => console.log(err));
  }, [nav]);

  const handleSearchMovies = useCallback((query, isShortMovie) => {
    setIsPreloaderOpen(true);

    moviesApi.getMovies()
      .then(res => {
        const movies = res
          .filter(movie => movie.nameRU.toUpperCase()
            .includes(query.toUpperCase()) &&
              (isShortMovie ? movie.duration <= SHORT_MOVIE_DURATION : true)
          )
          .map(movie => ({
            ...movie,
            isLiked: savedMovies.some(savedMovie => savedMovie.id === movie.id),
            image: `${moviesApiBaseUrl}${movie.image.url}`,
            thumbnail: `${moviesApiBaseUrl}${movie.image.formats.thumbnail.url}`,
            trailer: movie.trailerLink,
          }));

        setMovies(movies);
        lsHelper.setFoundFilms(movies);
      })
      .catch(() => setModalResult({
        text: messages.serverError,
        isError: true,
      }))
      .finally(() => setIsPreloaderOpen(false));
  }, [savedMovies, setModalResult]);

  const handleMovieLike = useCallback((movie) => {
    if (movie.isLiked) {
      const movieId = savedMovies.find(savedMovie => savedMovie.movieId === movie.id)._id;

      mainApi.deleteMovie(movieId)
        .then(() => {
          setMovies(prevMovies => {
            const newMovies = prevMovies.map(prevMovie => prevMovie.id !== movie.id ? prevMovie : {...prevMovie, isLiked: false });

            lsHelper.setFoundFilms(newMovies);
            return newMovies;
          });

          setSavedMovies(prevSavedMovies => prevSavedMovies
            .filter(savedMovie => savedMovie.movieId !== movie.id));
        })
        .catch();
    } else {
      mainApi.saveMovie({...movie,
        movieId: movie.id,
      })
        .then(savedMovie => {
          setMovies(prevMovies => {
            const newMovies = prevMovies.map(prevMovie => prevMovie.id !== movie.id ? prevMovie : {...prevMovie, isLiked: true });

            lsHelper.setFoundFilms(newMovies);
            return newMovies;
          });

          setSavedMovies(prevSavedMovies => [...prevSavedMovies, { ...savedMovie, isSaved: true }]);
        })
        .catch();
    }
  }, [savedMovies]);

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
        handleSearchMovies,
        handleMovieLike
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
