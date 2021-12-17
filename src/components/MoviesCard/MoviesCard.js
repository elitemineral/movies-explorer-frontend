import { moviesApiBaseUrl } from '../../utils/constants';
import './MoviesCard.css';

export default function MoviesCard(props) {
  const {
    id,
    name,
    duration,
    image,
    trailerLink,
    isLiked,
    isSaved,
    onMovieLike,
    onMovieDelete,
  } = props;

  const minutesToHm = (value) => {
    value = Number(value);
    const h = Math.floor(value / 60);
    const m = value % 60;

    return h + 'ч ' + m + 'м';
  };

  const handleMovieClick = () => {
    window.open(trailerLink, '_blank');
  }

  const handleMovieLike = () => {
    onMovieLike(id);
  }

  return (
    <li className='movies__item'>
      <img
        className='movie__image'
        src={`${moviesApiBaseUrl}${image}`}
        alt={name}
        onClick={handleMovieClick}
      />
      <div className='movies__container'>
        <h2 className='movies__title'>{name}</h2>
        {isSaved ? (
          <button
            className='button movies__button-delete'
            type='button'
            onClick={onMovieDelete}
            aria-label='Удалить'
          ></button>
        ) : (
          <button
            className={`button movies__button-like${
              isLiked ? ' movies__button-like_active' : ''
            }`}
            type='button'
            onClick={handleMovieLike}
            aria-label='Добавить в избранное'
          />
        )}
      </div>
      <p className='movies__movie-duration'>{minutesToHm(duration)}</p>
    </li>
  );
}
