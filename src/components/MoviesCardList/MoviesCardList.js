import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({
  movies,
  onMovieLike,
}) {
  return (
      <ul className='movies__list'>
        {movies.map((card) => (
          <MoviesCard
            key={card.id}
            id={card.id}
            name={card.nameRU}
            duration={card.duration}
            image={card.image.url}
            trailerLink={card.trailerLink}
            isLiked={card.isLiked}
            isSaved={card.isSaved}
            onMovieLike={onMovieLike}
            handleDeleteClick={() => {}}
          />
        ))}
      </ul>
  );
}
