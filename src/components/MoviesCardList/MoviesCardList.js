import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {
  return (
      <ul className='movies__list'>
        {movies.map(movie => (
          <MoviesCard
            key={movie.id ?? movie._id}
            movie={movie}
          />
        ))}
      </ul>
  );
}
