import Header from "../Header/Header";
import './Profile.css';

export default function Profile() {
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
            <h1 className='form__heading-profile'>
              Привет, Виталий!
            </h1>
            <fieldset className='form-profile-inputs'>
              <label className='form__label-profile'>
                Имя
                <input
                  className='form__input-profile'
                  name='name'
                  type='text'
                  //value=''
                  //onChange={() => {}}
                  required
                />
              </label>
              <span className='form__input-error form__input-error_visible'>Что-то пошло не так...</span>
              <label className='form__label-profile form__label-profile_overline'>
                E&#8209;mail
                <input
                  className='form__input-profile'
                  name='email'
                  type='email'
                  //value=''
                  //onChange={() => {}}
                  required
                />
              </label>
              <span className='form__input-error form__input-error_visible'>Что-то пошло не так...</span>
            </fieldset>
            <button
              className='button form__button-edit'
              type='submit'
            >
              Редактировать
            </button>
          </form>
          <button
            className='button form__button-exit-profile'
            type='submit'
          >
            Выйти из аккаунта
          </button>
        </section>
      </main>
    </>
  )
}
