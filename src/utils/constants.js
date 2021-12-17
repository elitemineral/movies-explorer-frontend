export const authStatuses = {
  undefined: 0,
  loggedIn: 1,
  loggedOut: 2,
}

export const appRoutes = {
  root: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signIn: '/signin',
  signUp: '/signup',
}

export const mainApiBaseUrl = 'http://localhost:3001';
export const moviesApiBaseUrl = 'https://api.nomoreparties.co';

export const lsMoviesExplorerKeys = {
  moviesExplorerFoundFilms: 'moviesExplorerFoundFilms',
  moviesExplorerQueryString: 'moviesExplorerQueryString',
  moviesExplorerIsShortMovie: 'moviesExplorerIsShortMovie',
  moviesExplorerCounter: 'moviesExplorerCounter',
}

export const messages = {
  serverError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',

  registerDuplicateError: 'Пользователь с таким email уже существует.',
  registerError: 'При регистрации пользователя произошла ошибка.',
  registerSuccess: 'Вы успешно зарегистрировались!',

  authorizeIncorrectDataError: 'Вы ввели неправильный логин или пароль.',
  authorizeError: 'При авторизации произошла ошибка.',
}
