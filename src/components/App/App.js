import Main from '../Main/Main.js';
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from '../../utils/constants.js';

function App() {
  return (
    <Routes>
      <Route path={appRoutes.root} element={<Main />} />
    </Routes>
  );
}

export default App;
