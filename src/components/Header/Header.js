import headerLogo from '../../images/header-logo.svg';
import HeaderNav from '../HeaderNav/HeaderNav';
import './Header.css';

export default function Header(props) {
  const { loggedIn = true } = props;

  return (
    <header className={`header${loggedIn ? ' header_theme-white' : ''}`}>
      <img className='header__logo' src={headerLogo} alt='Логотип' />
      <HeaderNav />
    </header>
  );
}
