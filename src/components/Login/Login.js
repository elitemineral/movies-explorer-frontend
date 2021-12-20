import { Link } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import { useForm, validators } from '../../utils/helpers';
import './Login.css';

export default function Login() {
  const handleAuthorize = useContext(CurrentUserContext).handleAuthorize;

  const { formValues, handleChange } = useForm();

  const [errors, setErrors] = useState({
    email: {
      required: true,
      isEmail: true,
    },
    password: {
      required: true,
      minLength: true,
    }
  });

  useEffect(() => {
    const { email, password } = formValues;

    const emailValidationResult = Object.keys(validators.email).map(errorKey => {
      const errorResult = validators.email[errorKey](email);
      return { [errorKey]: errorResult }
    }).reduce((acc, err) => ({ ...acc, ...err }), {});

    const passwordValidationResult = Object.keys(validators.password).map(errorKey => {
      const errorResult = validators.password[errorKey](password);
      return { [errorKey]: errorResult }
    }).reduce((acc, err) => ({ ...acc, ...err }), {});

    setErrors({
      email: emailValidationResult,
      password: passwordValidationResult,
    });
  }, [formValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAuthorize(formValues);
  };

  const isEmailInvalid = !formValues.email || Object.values(errors.email).some(Boolean);
  const isPasswordInvalid = !formValues.password || Object.values(errors.password).some(Boolean);
  const isSubmitDisabled = isEmailInvalid || isPasswordInvalid;

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
                value={formValues.email || ''}
                onChange={handleChange}
              />
              <span className={`form__input-error${errors.email.required ? ' form__input-error_visible' : ''}`}>
                Заполните это поле.
              </span>
              <span className={`form__input-error${errors.email.isEmail ? ' form__input-error_visible' : ''}`}>
                Некорректный адрес электронной почты.
              </span>
            </label>
            <label className='form__label-auth'>
              Пароль
              <input
                className='form__input-auth'
                name='password'
                type='password'
                value={formValues.password || ''}
                onChange={handleChange}
              />
              <span className={`form__input-error${errors.password.required ? ' form__input-error_visible' : ''}`}>
                Заполните это поле.
              </span>
              <span className={`form__input-error${errors.password.minLength ? ' form__input-error_visible' : ''}`}>
                Пароль должен быть не короче 8 символов.
              </span>
            </label>
            <button
              className={`button form__button-auth form__button-auth_offset${isSubmitDisabled ? ' button_disabled' : ''}`}
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
