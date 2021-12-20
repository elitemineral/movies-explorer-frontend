import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm, validators } from '../../utils/helpers';
import Header from '../Header/Header';
import './Profile.css';

export default function Profile() {
  const handleUpdateUser = useContext(CurrentUserContext).handleUpdateUser;
  const handleLogout = useContext(CurrentUserContext).handleLogout;
  const user = useContext(CurrentUserContext).currentUser;

  const { formValues, handleChange } = useForm(user);

  const [errors, setErrors] = useState({
    name: {
      required: true,
      minLength: true,
      onlyAllowedSymbols: true,
    },
    email: {
      required: true,
      isEmail: true,
    }
  });

  useEffect(() => {
    const { name, email } = formValues;

    const nameValidationResult = Object.keys(validators.name).map(errorKey => {
      const errorResult = validators.name[errorKey](name);
      return { [errorKey]: errorResult }
    }).reduce((acc, err) => ({ ...acc, ...err }), {});

    const emailValidationResult = Object.keys(validators.email).map(errorKey => {
      const errorResult = validators.email[errorKey](email);
      return { [errorKey]: errorResult }
    }).reduce((acc, err) => ({ ...acc, ...err }), {});

    setErrors({
      name: nameValidationResult,
      email: emailValidationResult
    });
  }, [formValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { name, email } = formValues;
    handleUpdateUser(name, email);
  }

  const { name, email } = formValues;
  const isNameInvalid = !formValues.name || Object.values(errors.name).some(Boolean);
  const isEmailInvalid = !formValues.email || Object.values(errors.email).some(Boolean);
  const isSubmitDisabled = isNameInvalid || isEmailInvalid || (name === user.name && email === user.email);

  return (
    <>
      <Header />
      <main>
        <section className='profile'>
          <form
            className='form form-profile'
            name='form-profile'
            onSubmit={handleSubmit}
          >
            <h1 className='form__heading-profile'>{`Привет, ${user.name}!`}</h1>
            <fieldset className='form-profile-inputs'>
              <label className='form__label-profile'>
                Имя
                <input
                  className='form__input-profile'
                  name='name'
                  type='text'
                  value={name || ''}
                  onChange={handleChange}
                  maxLength={30}
                />
              </label>
              <span className={`form__input-error${errors.name.required ? ' form__input-error_visible' : ''}`}>
                Заполните это поле.
              </span>
              <span className={`form__input-error${errors.name.minLength ? ' form__input-error_visible' : ''}`}>
                Текст должен быть не короче 2 символов.
              </span>
              <span className={`form__input-error${errors.name.onlyAllowedSymbols ? ' form__input-error_visible' : ''}`}>
                Текст должен содержать только кириллицу, латиницу, дефис или пробел.
              </span>
              <label className='form__label-profile form__label-profile_overline'>
                E&#8209;mail
                <input
                  className='form__input-profile'
                  name='email'
                  type='email'
                  value={email || ''}
                  onChange={handleChange}
                />
              </label>
              <span className={`form__input-error${errors.email.required ? ' form__input-error_visible' : ''}`}>
                Заполните это поле.
              </span>
              <span className={`form__input-error${errors.email.isEmail ? ' form__input-error_visible' : ''}`}>
                Некорректный адрес электронной почты.
              </span>
            </fieldset>
            <button className={`button form__button-edit${isSubmitDisabled ? ' form__button-edit_disabled' : ''}`} type='submit'>
              Редактировать
            </button>
          </form>
          <button
            className='button form__button-exit-profile'
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </section>
      </main>
    </>
  );
}
