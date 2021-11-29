import { useCallback, useEffect, useState } from 'react';
import Button from '../Button/Button';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import Link from '../Link/Link';
import './HeaderNav.css';

const MAX_MOBILE_WIDTH = 1279;

export default function HeaderNav(props) {
  const { loggedIn = true } = props;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= MAX_MOBILE_WIDTH);

  const resizeWindow = useCallback(() => {
    const isMobileNew = window.innerWidth <= MAX_MOBILE_WIDTH;
    if (isMobileNew !== isMobile) {
      setIsMobile(isMobileNew);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);

    return () => window.removeEventListener('resize', resizeWindow);
  }, [resizeWindow]);

  return (
    <nav className='header__nav'>
      {loggedIn ?
        <HeaderMenu isMobile={isMobile} /> :
        <>
          <Link className='header__link-register' path='' text='Регистрация' />
          <Button className='header__button-login' text='Войти' />
        </>
      }
    </nav>
  );
}
