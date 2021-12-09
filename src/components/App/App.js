import Main from '../Main/Main.js';
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from '../../utils/constants.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState } from 'react';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const cards = new Array(12).fill({
    name: '33 слова о дизайне',
    duration: '1ч 47м',
    thumbnail: '',
    isLiked: false,
    isSaved: false,
    handleCardClick: () => {},
    handleLikeClick: () => {},
    handleDeleteClick: () => {},
  });

  return (
    <CurrentUserContext.Provider value={{ loggedIn }}>
      <Routes>
        <Route path={appRoutes.root} element={<Main />} />
        <Route path={appRoutes.movies} element={<Movies cards={cards.map((card, idx) => ({...card, isLiked: idx % 2 === 0}))} />} />
        <Route path={appRoutes.savedMovies} element={<SavedMovies cards={cards.map(card => ({...card, isSaved: true}))} />} />
        <Route path={appRoutes.signUp} element={<Register />} />
        <Route path={appRoutes.signIn} element={<Login />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
