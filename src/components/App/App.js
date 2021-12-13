import Main from '../Main/Main.js';
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from '../../utils/constants.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState } from 'react';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import PageNoFound from '../PageNoFound/PageNoFound.js';
import Preloader from '../Preloader/Preloader.js';
import { useCallback } from 'react/cjs/react.development';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);

  const showPreloader = useCallback(() => {
    setIsPreloaderOpen(true);
  }, []);

  const hidePreloader = useCallback(() => {
    setIsPreloaderOpen(false);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ loggedIn, showPreloader, hidePreloader }}>
      <Routes>
        <Route path={appRoutes.root} element={<Main />} />
        <Route path={appRoutes.movies} element={<Movies />} />
        {/* <Route path={appRoutes.savedMovies} element={<SavedMovies cards={cards.map(card => ({...card, isSaved: true}))} />} /> */}
        <Route path={appRoutes.signUp} element={<Register />} />
        <Route path={appRoutes.signIn} element={<Login />} />
        <Route path={appRoutes.profile} element={<Profile />} />
        <Route path='*' element={<PageNoFound />} />
      </Routes>

      <Preloader
        isOpen={isPreloaderOpen}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
