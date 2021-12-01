import { useCallback, useEffect, useState } from 'react';
import Burger from '../Burger/Burger';
import Popup from '../Popup/Popup';
import { NavLink } from 'react-router-dom';
import './HeaderMenu.css';
import { appRoutes } from '../../utils/constants';

const MAX_MOBILE_WIDTH = 1279;

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const getMenuLinkClassName = ({ isActive }) => {
    return `link header__menu-link${isActive ? ' header__menu-link_active' : ''}`;
  }

  const menuItems = () => {
    return (
      <ul className='header__menu-items'>
        {isMobile && (
          <li className='header__menu-item'>
            <NavLink className={getMenuLinkClassName} to={appRoutes.root}>Главная</NavLink>
          </li>
        )}
        <li className='header__menu-item'>
          <NavLink className={getMenuLinkClassName} to={appRoutes.movies}>Фильмы</NavLink>
        </li>
        <li className='header__menu-item'>
          <NavLink className={getMenuLinkClassName} to={appRoutes.savedMovies}>Сохранённые фильмы</NavLink>
        </li>
        <li className='header__menu-item header__menu-item_position-bottom'>
          <NavLink className={getMenuLinkClassName} to={appRoutes.profile}>Аккаунт</NavLink>
        </li>
      </ul>
    );
  };

  return (
    <>
      {isMobile ? (
        <>
          <Burger isOpen={isOpen} onClick={handleBurgerClick} />
          <Popup onClose={handleOnClose} isOpen={isOpen}>
            {menuItems()}
          </Popup>
        </>
      ) : (
        menuItems()
      )}
    </>
  );
}
