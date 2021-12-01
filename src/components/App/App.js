import Main from '../Main/Main.js';
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from '../../utils/constants.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState } from 'react';
import Movies from '../Movies/Movies.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <CurrentUserContext.Provider value={{ loggedIn }}>
      <Routes>
        <Route path={appRoutes.root} element={<Main />} />
        <Route path={appRoutes.movies} element={<Movies />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
