import imgError from '../../images/img-error.svg';
import ModalDialog from '../ModalDialog/ModalDialog';

export default function ErrorModalDialog(props) {
  const { data, onClose } = props;

  return (
    <ModalDialog
      isOpen={data && data.isError}
      text={data?.text}
      img={imgError}
      note='Ошибка'
      onClose={onClose}
    />
  );
}
