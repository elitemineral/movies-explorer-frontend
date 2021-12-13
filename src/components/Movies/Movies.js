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

  const cardsSettings = useCallback(() => {
    const width = window.innerWidth;

    let totalCards;
    let cardsLineLength;

    if (width < 768) {
      totalCards = 5;
      cardsLineLength = 2;
    } else {
      if (width < 1280) {
        totalCards = 8;
        cardsLineLength = 2;
      } else {
        totalCards = 12;
        cardsLineLength = 3;
      }
    }

    return {
      totalCards,
      cardsLineLength,
    };
  }, []);

  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
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

  // Загрузка данных
  useEffect(() => {
    showPreloader();

    moviesApi.getInitialCards()
      .then(res => {
        setCards(res);
        setFilteredCards(res.slice(0, cardsSettings().totalCards));
      })
      .catch(err => console.log(err))
      .finally(() => hidePreloader())
  }, [showPreloader, hidePreloader, cardsSettings]);

  const handleClick = useCallback(() => {
    setFilteredCards([...filteredCards, ...cards.slice(filteredCards.length, filteredCards.length + cardsLineLength)]);
  }, [cards, filteredCards, cardsLineLength]);

  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <MoviesCardList cards={filteredCards} />
        {filteredCards.length < cards.length &&
          <button className='button cards__button-more' onClick={handleClick}>Ещё</button>
        }
      </main>
      <Footer />
    </>
  );
}
