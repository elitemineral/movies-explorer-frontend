import { Link as RouterLink} from 'react-router-dom';
import './Link.css';

export default function Link(props) {
  const {
    text,
    path,
    className
  } = props;

  const customClassName = `link${className ? ' ' + className : ''}`;

  return (
    <RouterLink className={customClassName} to={path}>
      {text}
    </RouterLink>
  );
}
