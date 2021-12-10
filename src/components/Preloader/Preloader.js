import Popup from '../Popup/Popup';
import './Preloader.css';

export default function Preloader({ isOpen }) {
  return (
    <Popup
      isOpen={isOpen}
    >
      <div className='preloader'>
        <div className='preloader__container'>
          <span className='preloader__round' />
        </div>
      </div>
    </Popup>
  );
};
