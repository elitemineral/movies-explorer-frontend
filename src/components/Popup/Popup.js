import './Popup.css';

export default function Popup(props) {
  const {
    isOpen,
    children
  } = props;

  return (
    <div className={`popup${isOpen ? ' popup_opened' : ''}`}>
      {/* <div className='popup__container' style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end'}}> */}
        {children}
      {/* </div> */}
    </div>
  );
}
