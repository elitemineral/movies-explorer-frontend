import Popup from '../Popup/Popup';
import { useMemo } from 'react';
import imgError from '../../images/img-error.svg';
import imgInfo from '../../images/img-info.svg';
import { messages } from '../../utils/constants';
import './ModalDialog.css';

export default function ModalDialog(props) {
  const { modalInfo, onClose } = props;

  const getText = useMemo(() => {
    switch (modalInfo?.code) {
      case 400:
        return messages.badRequesError;
      case 401:
        return messages.authorizeIncorrectDataError;
      case 409:
        return messages.registerDuplicateError;
      case 500:
        return messages.serverError;
      default:
        return modalInfo?.text;
    }
  }, [modalInfo]);

  return (
    <Popup
      isOpen={modalInfo !== null}
      onClose={onClose}
      containerClassName='popup-modal-container'
    >
      <div className='modal'>
        <img
          className='modal__image'
          src={modalInfo?.code === null ? imgInfo : imgError}
          alt={'Изображение'}
        />
        <p className='modal__message'>{getText}</p>
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
