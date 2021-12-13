import { moviesApiBaseUrl } from '../../utils/constants';
import './MoviesCard.css';

export default function MoviesCard(props) {
  const {
    name,
    duration,
    image,
    trailerLink,
    isLiked,
    isSaved,
    handleLikeClick,
    handleDeleteClick,
  } = props;

  const minutesToHm = (value) => {
    value = Number(value);
    const h = Math.floor(value / 60);
    const m = value % 60;

    return h + 'ч ' + m + 'м';
  };

  const handleCardClick = () => {
    window.open(trailerLink, '_blank');
  }

  return (
    <li className='cards__item'>
      <img
        className='cards__image'
        src={`${moviesApiBaseUrl}${image}`}
        alt={name}
        onClick={handleCardClick}
      />
      <div className='cards__container'>
        <h2 className='cards__title'>{name}</h2>
        {isSaved ? (
          <button
            className='button cards__button-delete'
            type='button'
            onClick={handleDeleteClick}
            aria-label='Удалить'
          ></button>
        ) : (
          <button
            className={`button cards__button-like${
              isLiked ? ' cards__button-like_active' : ''
            }`}
            type='button'
            onClick={handleLikeClick}
            aria-label='Добавить в избранное'
          />
        )}
      </div>
      <p className='cards__movie-duration'>{minutesToHm(duration)}</p>
    </li>
  );
}
