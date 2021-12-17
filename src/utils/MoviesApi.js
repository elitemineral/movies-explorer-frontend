import { moviesApiBaseUrl } from './constants';

class MoviesApi {
  constructor(apiUrl) {
    this._apiUrl = apiUrl;
  }

  _promiseHandler(promise) {
    return promise
      .then(res => res.ok
        ? res.json()
        : Promise.reject({
            text: res.statusText,
            status: res.status
          })
      );
  }

  getInitialCards() {
    return this._promiseHandler(
      fetch(`${this._apiUrl}`, {
        method: 'GET',
      })
    );
  }
}

export default new MoviesApi(moviesApiBaseUrl + '/beatfilm-movies');
