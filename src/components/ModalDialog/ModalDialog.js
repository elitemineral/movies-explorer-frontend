import Popup from '../Popup/Popup';
import './ModalDialog.css';

export default function ModalDialog(props) {
  const { isOpen, text, img, note, onClose } = props;

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      containerClassName='popup-modal-container'
    >
      <div className='modal'>
        <img className='modal__image' src={img} alt={note} />
        <p className='modal__message'>{text}</p>
        <button
          className='modal__button-close'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        />
      </div>
    </Popup>
  );
}
