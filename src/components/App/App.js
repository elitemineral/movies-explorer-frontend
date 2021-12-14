import Main from '../Main/Main';
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCallback, useState } from 'react';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNoFound from '../PageNoFound/PageNoFound';
import Preloader from '../Preloader/Preloader';
import ErrorModalDialog from '../ErrorModalDialog/ErrorModalDialog';
import InfoModalDialog from '../InfoModalDialog/InfoModalDialog';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
  const [modalResult, setModalResult] = useState(null);

  const showPreloader = useCallback(() => {
    setIsPreloaderOpen(true);
  }, []);

  const hidePreloader = useCallback(() => {
    setIsPreloaderOpen(false);
  }, []);

  const onCloseModalDialog = () => {
    setModalResult(null);
  }

  return (
    <CurrentUserContext.Provider value={{ loggedIn, showPreloader, hidePreloader, setModalResult }}>
      <Routes>
        <Route path={appRoutes.root} element={<Main />} />
        <Route path={appRoutes.movies} element={<Movies />} />
        <Route path={appRoutes.savedMovies} element={<SavedMovies />} />
        <Route path={appRoutes.signUp} element={<Register />} />
        <Route path={appRoutes.signIn} element={<Login />} />
        <Route path={appRoutes.profile} element={<Profile />} />
        <Route path='*' element={<PageNoFound />} />
      </Routes>

      <Preloader
        isOpen={isPreloaderOpen}
      />

      <ErrorModalDialog
        data={modalResult}
        onClose={onCloseModalDialog}
      />

      <InfoModalDialog
        data={modalResult}
        onClose={onCloseModalDialog}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
