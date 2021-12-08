import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import headerLogo from '../../images/header-logo.svg';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';
import './Header.css';

export default function Header() {
  const loggedIn = useContext(CurrentUserContext).loggedIn;
  const nav = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    nav(appRoutes.root)
  }

  return (
    <header className={`header${location.pathname !== appRoutes.root ? ' header_theme-light' : ''}`}>
      <img className='header__logo' src={headerLogo} alt='Логотип' onClick={handleLogoClick} />
      <nav className='header__menu'>
        {loggedIn ?
          <HeaderMenu /> :
          <>
            <Link className='link header__link-register' to=''>Регистрация</Link>
            <button className='button header__button-login'>Войти</button>
          </>
        }
      </nav>
    </header>
  );
}
