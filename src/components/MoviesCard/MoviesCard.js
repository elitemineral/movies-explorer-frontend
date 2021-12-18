import { useCallback, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MoviesCard.css';

export default function MoviesCard(props) {
  const setModalInfo = useContext(CurrentUserContext).setModalInfo;
  const handleMovieLike = useContext(CurrentUserContext).handleMovieLike;
  const handleMovieDelete = useContext(CurrentUserContext).handleMovieDelete;
  const isOffline = useContext(CurrentUserContext).isOffline;

  const movie = props.movie;

  const minutesToHm = (value) => {
    value = Number(value);
    const h = Math.floor(value / 60);
    const m = value % 60;

    return h + 'ч ' + m + 'м';
  };

  const handleMovieClick = useCallback(() => {
    window.open(movie.trailer, '_blank');
  }, [movie]);

  const handleBtnLikeClick = useCallback(() => {
    if (isOffline) {
      setModalInfo({ text: 'Отсутствует интерент-соединение', code: 200 });
      return;
    }

    handleMovieLike(movie);
  }, [setModalInfo, isOffline, handleMovieLike, movie]);

  const handleBtnDeleteClick = useCallback(() => {
    if (isOffline) {
      setModalInfo({ text: 'Отсутствует интерент-соединение', code: 200 });
      return;
    }

    handleMovieDelete(movie);
  }, [setModalInfo, isOffline, handleMovieDelete, movie]);

  return (
    <li className='movies__item'>
      <img
        className='movie__image'
        src={movie.image}
        alt={movie.nameRU}
        onClick={handleMovieClick}
      />
      <div className='movies__container'>
        <h2 className='movies__title'>{movie.nameRU}</h2>
        {movie.isSaved ? (
          <button
            className='button movies__button-delete'
            type='button'
            onClick={handleBtnDeleteClick}
            aria-label='Удалить'
          ></button>
        ) : (
          <button
            className={`button movies__button-like${
              movie.isLiked ? ' movies__button-like_active' : ''
            }`}
            type='button'
            onClick={handleBtnLikeClick}
            aria-label='Добавить в избранное'
          />
        )}
      </div>
      <p className='movies__movie-duration'>{minutesToHm(movie.duration)}</p>
    </li>
  );
}
