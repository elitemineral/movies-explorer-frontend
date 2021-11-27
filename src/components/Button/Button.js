import './Button.css';

export default function Button(props) {
  const {
    text,
    action,
    className
  } = props;

  const customClassName = `button${className ? ' ' + className : ''}`;

  return (
    <button className={customClassName} onClick={action}>
      {text}
    </button>
  );
}
