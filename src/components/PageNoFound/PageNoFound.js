import { useNavigate } from 'react-router';
import './PageNoFound.css';

export default function PageNoFound() {
  const nav = useNavigate();

  const handleButtonBackClik = () => {
    nav(-1);
  };

  return (
    <main>
      <section className='page-not-found'>
        <h1 className='page-not-found__title'>404</h1>
        <p className='page-not-found__subtitle'>Страница не найдена</p>
        <button
          className='link page-not-found__button-back'
          onClick={handleButtonBackClik}
        >
          Назад
        </button>
      </section>
    </main>
  );
}
