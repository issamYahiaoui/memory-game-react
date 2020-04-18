import React, {useState, useEffect} from 'react'
import {generatePlayGroundCards} from "../utils";
import Card from "./Card";

const size = 18
const GamePlayGround = ({cardImages}) => {

    const [cards, setCards] = useState(generatePlayGroundCards(size, cardImages));
    const [canFlip, setCanFlip] = useState(false);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [matchedCards, setMatchedCards] = useState([]);
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);
    const [tries, setTries] = useState(0);



    const setCardFlipped = (cardID, isFlipped) => {
        setCards(prevCard => prevCard.map(card => {
            if (card.id !== cardID)
                return card;
            return {...card, isFlipped};
        }));
    }
    const setAllCardsFlipped = (isFlipped) => {
        setCards(prevCard => prevCard.map(card => {
            return {...card, isFlipped};
        }));
    }
    const setCardCanFlip = (cardID, canFlip) => {
        setCards(prevCard => prevCard.map(card => {
            if (card.id !== cardID)
                return card;
            return {...card, canFlip};
        }));
    }
    const setAllCardsCanFlip = ( canFlip) => {
        setCards(prev => prev.map(c => {
            return {...c, canFlip};
        }));
    }

    const resetFirstAndSecondCards = () => {
        setFirstCard(null);
        setSecondCard(null);
    }

    const getScore = () => {
        // set number of tries
        setTimeout(() => {
            setTries(tries+1)
        }, 1000);
        const cards = cardImages.filter(c => (c.canFlip === false))
        console.log('you found ', cards)
    }

    const onSuccessGuess = () => {
        console.log('on success', [firstCard,secondCard] )

        setMatchedCards([...matchedCards, [firstCard, secondCard]])


        setCardCanFlip(firstCard.id, false);
        setCardFlipped(firstCard.id, false);
        setCardCanFlip(secondCard.id, false);
        setCardFlipped(secondCard.id, false);

        resetFirstAndSecondCards();

    }
    const onFailureGuess = () => {
        console.log('on failure')
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

    const onCardClick = (card) => {
        if (!canFlip)
            return;
        console.log('click on card ', card)
        if (!card.canFlip)
            return;

        if ((firstCard && (card.id === firstCard.id) || (secondCard && (card.id === secondCard.id))))
            return;

        setCardFlipped(card.id, false);

        (firstCard) ? setSecondCard(card) : setFirstCard(card);
    }


    const initialize = () =>{
        setTimeout(() => {
            let index = 0;
            setAllCardsFlipped(true)
            setCanFlip(true)
        }, 3000);
    }

    const restart = ()=>{
        setAllCardsFlipped(true)
        setAllCardsCanFlip(true)
        setCanFlip(true)
        resetFirstAndSecondCards();
        setTries(0)
        setMatchedCards([])
    }


    // showcase
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
        console.log('matchedcards ... ', matchedCards)
        if(matchedCards.length === size/2) {
            setEnd(true)
        }
    }, [matchedCards]);



    useEffect(() => {
        console.log('start ... ', start)
        if(!start && !secondCard && firstCard) {
            console.log('setstart ... ', start)
            setStart(true)
        }
    }, [firstCard]);


    console.log('cardImages ...', cards)
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

                {cards.map(card => <Card onClick={() => onCardClick(card)} key={card.id} {...card}/>)}
            </div>
        </div>)

}


export default GamePlayGround
