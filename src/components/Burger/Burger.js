import './Burger.css';

export default function Burger(props) {
  const { onClick, isOpen }  = props;

  return (
    <>
      <div className={`burger${isOpen ? ' burger_opened' : ''}`} onClick={onClick}>
        <span className={`burger-item${isOpen ? ' burger-item_active' : ''}`}></span>
      </div>
    </>
  );
}
