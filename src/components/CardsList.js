import React, {useState, useEffect} from 'react'
import {generatePlayGroundCards} from "../data/cards";
import CardListItem from "./Card";

const size = 18
const CardsList = ({cardImages}) => {

    const [cards, setCards] = useState(generatePlayGroundCards(size, cardImages));
    const [canFlip, setCanFlip] = useState(false);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [matchedCards, setMatchedCards] = useState([]);
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);
    const [tries, setTries] = useState(0);


    //flip card
    const setCardFlipped = (cardID, isFlipped) => {
        setCards(prevCard => prevCard.map(card => {
            if (card.id !== cardID)
                return card;
            return {...card, isFlipped};
        }));
    }
    //flip all cards
    const setAllCardsFlipped = (isFlipped) => {
        setCards(prevCard => prevCard.map(card => {
            return {...card, isFlipped};
        }));
    }

    // lock/unlock card
    const setCardCanFlip = (cardID, canFlip) => {
        setCards(prevCard => prevCard.map(card => {
            if (card.id !== cardID)
                return card;
            return {...card, canFlip};
        }));
    }
    // lock/unlock all cards
    const setAllCardsCanFlip = ( canFlip) => {
        setCards(prev => prev.map(c => {
            return {...c, canFlip};
        }));
    }


    // reset the guess
    const resetFirstAndSecondCards = () => {
        setFirstCard(null);
        setSecondCard(null);
    }

    // get score [tries ]
    const getScore = () => {
        // set number of tries
        setTimeout(() => {
            setTries(tries+1)
        }, 1000);
    }

    // handle success on guess
    const onSuccessGuess = () => {

        setMatchedCards([...matchedCards, [firstCard, secondCard]])

        setCardCanFlip(firstCard.id, false);
        setCardFlipped(firstCard.id, false);
        setCardCanFlip(secondCard.id, false);
        setCardFlipped(secondCard.id, false);

        resetFirstAndSecondCards();

    }

    // handle failure on guess
    const onFailureGuess = () => {

        const firstCardID = firstCard.id;
        const secondCardID = secondCard.id;

        setTimeout(() => {
            setCardFlipped(firstCardID, true);
        }, 1000);
        setTimeout(() => {
            setCardFlipped(secondCardID, true);
        }, 1200);


        resetFirstAndSecondCards();

    }


    // handle card click
    const onCardClick = (card) => {
        window.card = card


        if (!canFlip)
            return;
        if (!card.canFlip)
            return;

        //click on same flipped card
        if ((firstCard && (card.id === firstCard.id) || (secondCard && (card.id === secondCard.id))))
            return;


        setCardFlipped(card.id, false);

        (firstCard) ? setSecondCard(card) : setFirstCard(card);
    }



    // initialize : flip all cards at the beginning
    const initialize = () =>{
        setTimeout(() => {
            let index = 0;
            setAllCardsFlipped(true)
            setCanFlip(true) // unlock the flippping
        }, 3000);
    }


    //restart the game
    const restart = ()=>{
        setAllCardsFlipped(true)
        setAllCardsCanFlip(true)
        setCanFlip(true)
        resetFirstAndSecondCards();
        setTries(0)
        setMatchedCards([])
    }



    useEffect(() => {
        initialize()
    }, []);


    useEffect(() => {
        if (!firstCard || !secondCard)
            return;
        (firstCard.imageURL === secondCard.imageURL) ? onSuccessGuess() : onFailureGuess();
        getScore()

    }, [firstCard, secondCard])

    useEffect(() => {
        if(matchedCards.length === size/2) {
            // to control the end result message
            setEnd(true)
        }
    }, [matchedCards]);



    useEffect(() => {
        // to control the result message
        if(!start && !secondCard && firstCard) {
            setStart(true)
        }
    }, [firstCard]);


        return (
            <div>
                <div className="header">
                   <div className="result">
                       {
                           start ? end? "Congratulation ! You found all pairs" :
                               `You found ${matchedCards.length} out of ${size / 2 } pairs with ${tries} tries  `
                               : "Find All The Pairs"
                       }
                   </div>

                    <div className="restart">
                        <button onClick={()=>restart()}>Restart</button>
                    </div>
                </div>
                <div className="playground">
                    {cards.map(card => <CardListItem onClick={() => onCardClick(card)} key={card.id} {...card}/>)}
                </div>
            </div>)

}


export default CardsList
