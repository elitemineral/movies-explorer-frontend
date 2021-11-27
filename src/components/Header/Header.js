import Link from '../Link/Link';
import headerLogo from '../../images/heaer-logo.svg';
import Button from '../Button/Button';
import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={headerLogo} alt='Логотип' />
      <nav className='header__nav'>
        <Link className='header__link-register' path='' text='Регистрация' />
        <Button className='header__button-login' text='Войти' />
      </nav>
    </header>
  );
}
