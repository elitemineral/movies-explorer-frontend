import { useState } from 'react';
import Burger from '../Burger/Burger';
import Popup from '../Popup/Popup';
import './HeaderMenu.css';

export default function HeaderMenu(props) {
  const isMobile = props.isMobile;

  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = () => {
    return (
      <div className='header__menu'>
        <ul className='header__menu-links'>
          {/* <li className='header__menu-link'>Главная</li> */}
          <li className='header__menu-link'>Фильмы</li>
          <li className='header__menu-link'>Сохраненные фильмы</li>
          <li className='header__menu-link header__menu-link_position-bottom'>Аккаунт</li>
        </ul>
      </div>
    );
  }

  return (
    <>
      {isMobile ?
        <>
          <Burger isOpen={isOpen} onClick={handleBurgerClick} />
          <Popup isOpen={isOpen}>
            {menuItems()}
          </Popup>
        </>
      : menuItems()
      }
    </>
  );
}
