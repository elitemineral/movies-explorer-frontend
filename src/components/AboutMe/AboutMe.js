import './AboutMe.css';
import myPhoto from '../../images/my-photo.png';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='section__title'>Студент</h2>

      <div className='about-me__info'>
        <h3 className='about-me__name'>Дмитрий</h3>
        <p className='about-me__brief'>Фронтенд-разработчик, 29 лет</p>
        <p className='about-me__biography'>
          Я родился в Лысьве, живу в Перми, закончил электротехнический
          факультет ПГТУ. У меня есть жена и сын. Я люблю слушать музыку, а ещё
          увлекаюсь тяжелой атлетикой. Программирую давно. С 2013 года работал в
          компании «ЗАО Прогноз», а с 2017 - в «ООО Лимон». До 2020 года
          веб-технологии обходил стороной. После того, как прошёл курс по
          веб-разработке, полноценно приступил к решению frontend-задач.
        </p>
        <ul className='about-me__social-links'>
          <li>
            <a
              className='link about-me__social-link'
              href='https://vk.com'
              target='_blank'
              rel='noreferrer'
            >
              ВКонтакте
            </a>
          </li>
          <li>
            <a
              className='link about-me__social-link'
              href='https://github.com/it-limon'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
        <img className='about-me__photo' src={myPhoto} alt='Моё фото' />
      </div>

      <h3 className='about-me__portfolio'>Портфолио</h3>
      <ul className='about-me__portfolio-links'>
        <li>
          <a
            className='link about-me__portfolio-link'
            href='https://it-limon.github.io/how-to-learn/index.html'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт
          </a>
        </li>
        <li>
          <a
            className='link about-me__portfolio-link'
            href='https://it-limon.github.io/russian-travel/index.html'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт
          </a>
        </li>
        <li>
          <a
            className='link about-me__portfolio-link about-me__portfolio-link_position-last'
            href='https://it-limon.nomoredomains.rocks'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}
