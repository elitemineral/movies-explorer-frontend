import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ cards }) {

  return (
    <section className='cards'>
      <ul className='cards__list'>
        {cards.map((card) => (
          <MoviesCard
            key={card.id}
            name={card.nameRU}
            duration={card.duration}
            image={card.image.url}
            trailerLink={card.trailerLink}
            isLiked={card.isLiked}
            isSaved={card.isSaved}
            handleCardClick={() => {}}
            handleLikeClick={() => {}}
            handleDeleteClick={() => {}}
          />
        ))}
      </ul>
    </section>
  );
}
