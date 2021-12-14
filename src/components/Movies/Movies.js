import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import moviesApi from '../../utils/MoviesApi';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Movies.css';

export default function Movies() {
  const showPreloader = useContext(CurrentUserContext).showPreloader;
  const hidePreloader = useContext(CurrentUserContext).hidePreloader;
  const setModalResult = useContext(CurrentUserContext).setModalResult;

  const cardsSettings = useCallback(() => {
    const width = window.innerWidth;

    let initialCardsCount;
    let cardsLineLength;

    if (width < 768) {
      initialCardsCount = 5;
      cardsLineLength = 2;
    } else {
      if (width < 1280) {
        initialCardsCount = 8;
        cardsLineLength = 2;
      } else {
        initialCardsCount = 12;
        cardsLineLength = 3;
      }
    }

    return {
      initialCardsCount,
      cardsLineLength,
    };
  }, []);

  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [cardsCounter, setCardsCounter] = useState(cardsSettings().initialCardsCount);
  const [cardsLineLength, setCardsLineLength] = useState(cardsSettings().cardsLineLength);

  const resizeWindow = useCallback(() => {
    const newCardsLineLength = cardsSettings().cardsLineLength;
    if (newCardsLineLength !== cardsLineLength) {
      setCardsLineLength(newCardsLineLength);
    }
  }, [cardsLineLength, cardsSettings]);

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, [resizeWindow]);

  const handleBtnMoreClick = useCallback(() => {
    setCardsCounter(prevValue => prevValue + cardsLineLength);

    setFilteredCards(prevCards => {
      return [...prevCards, ...cards.slice(prevCards.length, prevCards.length + cardsLineLength)]
    });
  }, [cards, cardsLineLength]);

  const onSearchFormSubmit = useCallback((query, isShortMovie) => {
    showPreloader();

    moviesApi.getInitialCards()
    .then(res => {
      const cards = res
        .filter(card => card.nameRU
          .toUpperCase().includes(query.toUpperCase()) &&
          (isShortMovie ? card.duration <= 40 : true)
        );

      setCards(cards);

      const cardsCount = cardsSettings().initialCardsCount;
      setCardsCounter(cardsCount);
      setFilteredCards(cards.slice(0, cardsCount));
    })
    .catch(() => setModalResult({
      text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
      isError: true,
    }))
    .finally(hidePreloader);
  }, [cardsSettings, showPreloader, hidePreloader, setModalResult]);

  return (
    <>
      <Header />
      <main>
        <SearchForm
          onSubmit={onSearchFormSubmit}
        />
        <section className='cards'>
          <MoviesCardList cards={filteredCards} />
          {cardsCounter < cards.length && (
            <button className='button cards__button-more' onClick={handleBtnMoreClick}>Ещё</button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
