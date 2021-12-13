import './MoviesCard.css';

export default function MoviesCard(props) {
  const {
    name,
    duration,
    thumbnail,
    isLiked,
    isSaved,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  } = props;

  return (
    <li className='cards__item'>
      <img className='cards__image' src={thumbnail} alt={name} onClick={handleCardClick} />
      <div className='cards__container'>
        <h2 className='cards__title'>{name}</h2>
        {isSaved ? (
          <button
            className='button cards__button-delete'
            type='button'
            onClick={handleDeleteClick}
            aria-label='Удалить'>
          </button>
        ) : (
          <button
            className={`button cards__button-like${isLiked ? ' cards__button-like_active' : ''}`}
            type='button'
            onClick={handleLikeClick}
            aria-label='Добавить в избранное'
          />
        )}
      </div>
      <p className='cards__movie-duration'>{duration}</p>
    </li>
  );
}
