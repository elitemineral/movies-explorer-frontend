import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className='search'>
      <form className='form search-form' name='search-form' onSubmit={() => {}}>
        <fieldset className='search-form__container'>
          <div className='search-form__loupe' />
          <input className='search-form__input' name='movie' type='text' placeholder='Фильм' />
          <button className='button form__button-submit' type='submit'>Найти</button>
        </fieldset>
        <label className='search-form__switcher-label'>
          <input className='search-form__switcher' name='short-movie' type='checkbox' defaultChecked />
          Короткометражки
        </label>
      </form>
    </section>
  );
}
