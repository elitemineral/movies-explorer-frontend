import { Link } from 'react-router-dom';
import { appRoutes, messages } from '../../utils/constants';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCallback, useContext } from 'react';
import { useState } from 'react/cjs/react.development';
import './Login.css';

export default function Login() {
  const setModalInfo = useContext(CurrentUserContext).setModalInfo;
  const handleAuthorize = useContext(CurrentUserContext).handleAuthorize;
  const isOffline = useContext(CurrentUserContext).isOffline;

  const [loginData, setLoginData] = useState({});
  const handleChange = (evt) => {
    setLoginData({
      ...loginData,
      [evt.target.name]: evt.target.value
    });
  }

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();

    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    handleAuthorize(loginData);
  }, [isOffline, handleAuthorize, loginData, setModalInfo]);

  return (
    <>
      <Header />
      <main>
        <section className='login'>
          <form
            className='form form-login'
            name='form-login'
            onSubmit={handleSubmit}
          >
            <h1 className='form__heading-auth'>
              Рады видеть!
            </h1>
            <label className='form__label-auth'>
              E-mail
              <input
                className='form__input-auth'
                name='email'
                type='email'
                value={loginData.email || ''}
                onChange={handleChange}
                required
              />
              <span className='form__input-error'>Что-то пошло не так...</span>
            </label>
            <label className='form__label-auth'>
              Пароль
              <input
                className='form__input-auth'
                name='password'
                type='password'
                minLength={8}
                maxLength={15}
                value={loginData.password || ''}
                onChange={handleChange}
                required
              />
              <span className='form__input-error'>Что-то пошло не так...</span>
            </label>
            <button
              className='button form__button-auth form__button-auth_offset'
              type='submit'
            >
              Войти
            </button>
          </form>
          <div className='login__signin'>
            <p className='login__question'>Ещё не зарегистрированы?</p>
            <Link className='link login__link' to={appRoutes.signUp}>
              Регистрация
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
