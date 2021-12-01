import { useEffect, useRef } from 'react';
import './Popup.css';

export default function Popup(props) {
  const {
    isOpen,
    children,
    onClose,
    containerClassName,
  } = props;

  const ref = useRef(null);

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    const mouseDownClose = (evt) => {
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    }

    const container = ref.current;

    container.addEventListener('mousedown', mouseDownClose);
    document.addEventListener('keydown', closeByEscape);

    return () => {
      container.removeEventListener('mousedown', mouseDownClose);
      document.removeEventListener('keydown', closeByEscape);
    }
  }, [onClose]);

  const containerCustomClassName = `popup__container${containerClassName ? ' ' + containerClassName : ''}`;

  return (
    <div className={`popup${isOpen ? ' popup_opened' : ''}`}>
      <div className={containerCustomClassName} ref={ref}>
        {children}
      </div>
    </div>
  );
}
