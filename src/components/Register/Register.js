import { Link } from 'react-router-dom';
import { appRoutes, messages } from '../../utils/constants';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';
import { useCallback, useState } from 'react/cjs/react.development';
import './Register.css';

export default function Register() {
  const setModalInfo = useContext(CurrentUserContext).setModalInfo;
  const handleRegister = useContext(CurrentUserContext).handleRegister;
  const isOffline = useContext(CurrentUserContext).isOffline;

  const [registerData, setRegisterData] = useState({});

  const handleChange = (evt) => {
    setRegisterData({
      ...registerData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();

    if (isOffline) {
      setModalInfo({ text: messages.noConnection, code: 200 });
      return;
    }

    handleRegister(registerData);
  }, [isOffline, handleRegister, registerData, setModalInfo]);

  return (
    <>
      <Header />
      <main>
        <section className='register'>
          <form
            className='form form-register'
            name='form-register'
            onSubmit={handleSubmit}
          >
            <h1 className='form__heading-auth'>
              Добро пожаловать!
            </h1>
            <label className='form__label-auth'>
              Имя
              <input
                className='form__input-auth'
                name='name'
                type='text'
                value={registerData.name || ''}
                onChange={handleChange}
                required
              />
              <span className='form__input-error form__input-error_visible'>Что-то пошло не так...</span>
            </label>
            <label className='form__label-auth'>
              E-mail
              <input
                className='form__input-auth'
                name='email'
                type='email'
                value={registerData.email || ''}
                onChange={handleChange}
                required
              />
              <span className='form__input-error form__input-error_visible'>Что-то пошло не так...</span>
            </label>
            <label className='form__label-auth'>
              Пароль
              <input
                className='form__input-auth'
                name='password'
                type='password'
                minLength={8}
                value={registerData.password || ''}
                onChange={handleChange}
                required
              />
              <span className='form__input-error form__input-error_visible'>Что-то пошло не так...</span>
            </label>
            <button
              className='button form__button-auth'
              type='submit'
            >
              Зарегистрироваться
            </button>
          </form>
          <div className='register__signup'>
            <p className='register__question'>Уже зарегистрированы?</p>
            <Link className='link register__link' to={appRoutes.signIn}>
              Войти
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
