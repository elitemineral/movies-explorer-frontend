import { Link } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';
import Header from '../Header/Header';
import './Login.css';

export default function Login() {
  return (
    <>
      <Header />
      <section className='login'>
        <form
          className='form form-login'
          name='form-login'
          onSubmit={() => {}}
        >
          <h1 className='form__heading'>
            Рады видеть!
          </h1>
          <label className='form__label'>
            E-mail
            <input
              className='form__input'
              name='email'
              type='email'
              //value=''
              //onChange={() => {}}
              required
            />
            <span className='form__input-error'>Что-то пошло не так...</span>
          </label>
          <label className='form__label'>
            Пароль
            <input
              className='form__input'
              name='password'
              type='password'
              minLength={8}
              maxLength={15}
              //value=''
              //onChange={() => {}}
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
    </>
  );
};
