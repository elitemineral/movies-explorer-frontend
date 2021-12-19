import { useCallback, useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import './Profile.css';

export default function Profile() {
  const handleLogout = useContext(CurrentUserContext).handleLogout;
  const user = useContext(CurrentUserContext).currentUser;

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    }, []
  );

  return (
    <>
      <Header />
      <main>
        <section className='profile'>
          <form
            className='form form-profile'
            name='form-profile'
            onSubmit={() => {}}
          >
            <h1 className='form__heading-profile'>{`Привет, ${user.name}!`}</h1>
            <fieldset className='form-profile-inputs'>
              <label className='form__label-profile'>
                Имя
                <input
                  className='form__input-profile'
                  name='name'
                  type='text'
                  value={values.name}
                  onChange={handleChange}
                />
              </label>
              <span
                className={`form__input-error${
                  errors.name ? ' form__input-error_visible' : ''
                }`}
              >
                {errors.name}
              </span>
              <label className='form__label-profile form__label-profile_overline'>
                E&#8209;mail
                <input
                  className='form__input-profile'
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                />
              </label>
              <span className='form__input-error form__input-error_visible'>
                {errors.email}
              </span>
            </fieldset>
            <button className='button form__button-edit' type='submit'>
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
