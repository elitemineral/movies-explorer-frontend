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

export const mainApiBaseUrl = 'https://api.best-movies-explorer.nomoredomains.rocks';
export const moviesApiBaseUrl = 'https://api.nomoreparties.co';

export const lsMoviesExplorerKeys = {
  moviesExplorerFoundMovies: 'moviesExplorerFoundMovies',
  moviesExplorerMoviesQueryString: 'moviesExplorerMoviesQueryString',
  moviesExplorerIsShortMovie: 'moviesExplorerIsShortMovie',
  moviesExplorerMoviesCounter: 'moviesExplorerMoviesCounter',

  moviesExplorerFoundSavedMovies: 'moviesExplorerFoundSavedMovies',
  moviesExplorerSavedMoviesQueryString: 'moviesExplorerSavedMoviesQueryString',
  moviesExplorerIsShortSavedMovie: 'moviesExplorerIsShortSavedMovie',
}

export const messages = {
  noConnection: 'Во время запроса произошла ошибка. Возможно, проблема с соединением. Подождите немного и попробуйте ещё раз.',
  serverIsNotAvailable: 'Во время запроса произошла ошибка. Возможно, сервер недоступен. Подождите немного и попробуйте ещё раз.',
  serverError: 'Во время запроса произошла ошибка.',
  registerDuplicateError: 'Пользователь с таким email уже существует.',
  registerSuccess: 'Вы успешно зарегистрировались!',
  authorizeIncorrectDataError: 'Вы ввели неправильный логин или пароль.',
  noAccess: 'Нет доступа',
  badRequesError: 'Сервер не смог распознать запрос.',
  notFoundError: 'Запрашиваемый ресурс не найден',
  successfulUpdate: 'Данные успешно обновлены.',
}
