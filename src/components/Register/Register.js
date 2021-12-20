import { Link } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import { useForm, validators } from '../../utils/helpers';
import './Register.css';

export default function Register() {
  const handleRegister = useContext(CurrentUserContext).handleRegister;

  const { formValues, handleChange } = useForm();

  const [errors, setErrors] = useState({
    name: {
      required: true,
      minLength: true,
      onlyAllowedSymbols: true,
    },
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
    const { name, email, password } = formValues;

    const nameValidationResult = Object.keys(validators.name).map(errorKey => {
      const errorResult = validators.name[errorKey](name);
      return { [errorKey]: errorResult }
    }).reduce((acc, err) => ({ ...acc, ...err }), {});

    const emailValidationResult = Object.keys(validators.email).map(errorKey => {
      const errorResult = validators.email[errorKey](email);
      return { [errorKey]: errorResult }
    }).reduce((acc, err) => ({ ...acc, ...err }), {});

    const passwordValidationResult = Object.keys(validators.password).map(errorKey => {
      const errorResult = validators.password[errorKey](password);
      return { [errorKey]: errorResult }
    }).reduce((acc, err) => ({ ...acc, ...err }), {});

    setErrors({
      name: nameValidationResult,
      email: emailValidationResult,
      password: passwordValidationResult,
    });
  }, [formValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(formValues);
  };

  const isNameInvalid = !formValues.name || Object.values(errors.name).some(Boolean);
  const isEmailInvalid = !formValues.email || Object.values(errors.email).some(Boolean);
  const isPasswordInvalid = !formValues.password || Object.values(errors.password).some(Boolean);
  const isSubmitDisabled = isNameInvalid || isEmailInvalid || isPasswordInvalid;

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
                value={formValues.name || ''}
                onChange={handleChange}
              />
              <span className={`form__input-error${errors.name.required ? ' form__input-error_visible' : ''}`}>
                Заполните это поле.
              </span>
              <span className={`form__input-error${errors.name.minLength ? ' form__input-error_visible' : ''}`}>
                Текст должен быть не короче 2 символов.
              </span>
              <span className={`form__input-error${errors.name.onlyAllowedSymbols ? ' form__input-error_visible' : ''}`}>
                Текст должен содержать только кириллицу, латиницу, дефис или пробел.
              </span>
            </label>
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
              className={`button form__button-auth${isSubmitDisabled ? ' button_disabled' : ''}`}
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
