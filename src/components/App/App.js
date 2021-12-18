import Main from '../Main/Main';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { appRoutes, authStatuses, moviesApiBaseUrl } from '../../utils/constants';
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
  const [modalInfo, setModalInfo] = useState(null);
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const onCloseModalDialog = useCallback(() => {
    setModalInfo(null);
  }, []);

  const loadData = useCallback(() => {
    const promises = [mainApi.getUserInfo(), mainApi.getSavedMovies()];

    Promise.all(promises)
      .then(([userInfo, savedMovies]) => {
        setCurrentUser(userInfo);
        setSavedMovies(savedMovies.map(savedMovie => {
          return  {
            ...savedMovie,
            isSaved: true,
          }
        }));
        setAuthStatus(authStatuses.loggedIn);

        const foundFilms = lsHelper.foundFilms();
        if (foundFilms) {
          setMovies(foundFilms);
        }
      })
      .catch((err) => {
        setAuthStatus(authStatuses.loggedOut);
      });
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
    mainApi
      .authorize(email, password)
      .then(() => {
        loadData();
        nav(appRoutes.movies);
      })
      .catch(err => {
        setModalInfo({ text: err.text, code: err.code })
      });
  }, [loadData, nav]);

  const handleRegister = useCallback(({ name, email, password }) => {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleAuthorize({ email, password })
      })
      .catch(err => {
        setModalInfo({ text: err.text, code: err.code })
      });
  }, [handleAuthorize]);

  const handleLogout = useCallback(() => {
    mainApi.logout()
      .then(() => {
        setAuthStatus(authStatuses.loggedOut);
        nav(appRoutes.signIn);
        lsHelper.removeMoviesSetting();
        setMovies([]);
      })
      .catch(err => setModalInfo({ text: err.text, code: err.code }));
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
            isLiked: savedMovies.some(savedMovie => savedMovie.movieId === movie.id),
            image: `${moviesApiBaseUrl}${movie.image.url}`,
            thumbnail: `${moviesApiBaseUrl}${movie.image.formats.thumbnail.url}`,
            trailer: movie.trailerLink,
          }));

        setMovies(movies);
        setIsEmptyResult(movies.length === 0);
        lsHelper.setFoundFilms(movies);
        lsHelper.removeMoviesCounter();
      })
      .catch(err => setModalInfo({ text: err.text, code: err.code }))
      .finally(() => setIsPreloaderOpen(false));
  }, [savedMovies, setModalInfo]);

  const handleMovieDelete = useCallback((movie) => {
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

          lsHelper.setFoundFilms(newMovies);
          return newMovies;
        });

        setSavedMovies(prevSavedMovies => prevSavedMovies
          .filter(savedMovie => savedMovie._id !== id));
      })
      .catch(err => setModalInfo({ text: err.text, code: err.code }));
  }, [savedMovies]);

  const handleMovieLike = useCallback((movie) => {
    if (movie.isLiked) {
      handleMovieDelete(movie);
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
        .catch(err => setModalInfo({  text: err.text, code: err.code  }));
    }
  }, [handleMovieDelete]);

  return (
    <CurrentUserContext.Provider
      value={{
        authStatus,
        movies,
        savedMovies,
        isEmptyResult,
        handleRegister,
        handleAuthorize,
        handleLogout,
        setModalInfo,
        handleSearchMovies,
        handleMovieLike,
        handleMovieDelete,
        isOffline,
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
}

export default App;
