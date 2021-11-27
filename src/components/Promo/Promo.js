import promoLogo from '../../images/promo-image.svg';
import './Promo.css';

export default function Promo() {
  return (
    <section className='promo' id='123'>
      <div className='promo__container'>
        <div>
          <h1 className='promo__title'>
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className='promo__subtitle'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img className='promo__image' src={promoLogo} alt='Земной шар'></img>
      </div>
      <a
        className='promo__link'
        href='https://practicum.yandex.ru/web'
        target='_blank'
        rel='noreferrer'
      >
        Узнать больше
      </a>
    </section>
  );
}
