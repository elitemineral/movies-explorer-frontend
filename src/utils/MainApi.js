import { mainApiBaseUrl } from './constants';

class Api {
  constructor(apiUrl) {
    this._apiUrl = apiUrl;
  }

  _promiseHandler(promise) {
    return promise.then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({
            text: res.statusText,
            status: res.status,
          })
    );
  }

  register(name, email, password) {
    return this._promiseHandler(
      fetch(`${this._apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
    );
  }

  authorize = (email, password) => {
    return this._promiseHandler(
      fetch(`${this._apiUrl}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
    );
  };

  logout = () => {
    return this._promiseHandler(
      fetch(`${this._apiUrl}/logout`, {
        method: 'GET',
        credentials: 'include',
      })
    );
  };

  getUserInfo() {
    return this._promiseHandler(
      fetch(`${this._apiUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
      })
    );
  }

  getSavedMovies() {
    return this._promiseHandler(
      fetch(`${this._apiUrl}/movies`, {
        method: 'GET',
        credentials: 'include',
      })
    );
  }
}

export default new Api(mainApiBaseUrl);
