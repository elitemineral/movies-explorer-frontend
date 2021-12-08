import MoviesCard from '../MoviesCard/MoviesCard';
import cardPoster from '../../images/card-poster.png';
import ButtonMore from '../ButtonMore/ButtonMore';
import { useLocation } from 'react-router';
import { appRoutes } from '../../utils/constants';
import './MoviesCardList.css';

export default function MoviesCardList({ cards }) {
  const location = useLocation();

  return (
    <section className='cards'>
      <ul className='cards__list'>
        {cards.map((card, idx) => (
          <MoviesCard
            key={idx}
            name={card.name}
            duration={card.duration}
            thumbnail={cardPoster}
            isLiked={card.isLiked}
            isSaved={card.isSaved}
            handleCardClick={() => {}}
            handleLikeClick={() => {}}
            handleDeleteClick={() => {}}
          />
        ))}
      </ul>

      {location.pathname === appRoutes.movies && <ButtonMore />}
    </section>
  );
}
