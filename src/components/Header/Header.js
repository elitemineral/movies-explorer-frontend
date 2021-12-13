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
    <header className={`header
      ${location.pathname !== appRoutes.root ? ' header_theme-light' : ''}
      ${(location.pathname === appRoutes.signIn || location.pathname === appRoutes.signUp) ? ' header_stretched' : ''}
      `}>
      <img className='header__logo'
        src={headerLogo} alt='Логотип'
        onClick={handleLogoClick}
      />
      {!(location.pathname === appRoutes.signIn || location.pathname === appRoutes.signUp) && (
        <nav className='header__menu'>
          {loggedIn ?
            <HeaderMenu /> :
            <>
              <Link className='link header__link-register' to={appRoutes.signUp}>Регистрация</Link>
              <Link className='header__button-login' to={appRoutes.signIn}>Войти</Link>
            </>
          }
        </nav>
      )}
    </header>
  );
}
