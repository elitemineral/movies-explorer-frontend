import { moviesApiBaseUrl } from './constants';
import { promiseHandler } from './MainApi';

class MoviesApi {
  constructor(apiUrl) {
    this._apiUrl = apiUrl;
  }

  getMovies() {
    return promiseHandler(
      fetch(`${this._apiUrl}`, {
        method: 'GET',
      })
    );
  }
}

export default new MoviesApi(moviesApiBaseUrl + '/beatfilm-movies');
