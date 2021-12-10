import Popup from '../Popup/Popup';
import './ModalDialog.css';

export default function ModalDialog(props) {
  const { isOpen, onClose } = props;

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      containerClassName='popup-modal-container'
    >
      <div className='modal'>
        <p className='modal__message'>Вы успешно зарегистрировались!</p>
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
