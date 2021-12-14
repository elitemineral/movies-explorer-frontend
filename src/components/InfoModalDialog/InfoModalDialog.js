import imgInfo from '../../images/img-info.svg';
import ModalDialog from '../ModalDialog/ModalDialog';

export default function InfoModalDialog(props) {
  const { data, onClose } = props;

  return (
    <ModalDialog
      isOpen={data && !data.isError}
      text={data?.text}
      img={imgInfo}
      note='Информация'
      onClose={onClose}
    />
  );
}
