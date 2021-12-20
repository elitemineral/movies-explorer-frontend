import { mainApiBaseUrl } from './constants';

export const promiseHandler = (promise) => {
  return promise.then((res) =>
    res.ok
    ? res.json()
    : Promise.reject({
        text: res.statusText,
        code: res.status,
      })
  )
  .catch((err) => {
    if (err.code) {
      throw err;
    } else {
      return Promise.reject({
        code: 502,
      });
    }
  });
}

class Api {
  constructor(apiUrl) {
    this._apiUrl = apiUrl;
  }

  register(name, email, password) {
    return promiseHandler(
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
    return promiseHandler(
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
    return promiseHandler(
      fetch(`${this._apiUrl}/logout`, {
        method: 'GET',
        credentials: 'include',
      })
    );
  };

  getUserInfo() {
    return promiseHandler(
      fetch(`${this._apiUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
      })
    );
  }

  setUserInfo(name, email) {
    return promiseHandler(fetch(`${this._apiUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    }));
  }

  getSavedMovies() {
    return promiseHandler(
      fetch(`${this._apiUrl}/movies`, {
        method: 'GET',
        credentials: 'include',
      })
    );
  }

  saveMovie(movie) {
    return promiseHandler(
      fetch(`${this._apiUrl}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      })
    );
  }

  deleteMovie(movieId) {
    return promiseHandler(
      fetch(`${this._apiUrl}/movies/${movieId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
    );
  }
}

export default new Api(mainApiBaseUrl);
