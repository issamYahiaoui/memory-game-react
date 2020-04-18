import React, {useState, useEffect} from 'react'
import {generatePlayGroundCards} from "../utils";
import Card from "./Card";


const GamePlayGround = ({cardImages}) => {

    const [size, setSize] = useState(  18);
    const [cards, setCards] = useState(generatePlayGroundCards(18, cardImages));
    const [canFlip, setCanFlip] = useState(false);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);

    const [matchedCards, setMatchedCards] = useState([]);
    const [start, setStart] = useState(false);
    const [tries, setTries] = useState(0);

    const setCardIsFlipped = (cardID, isFlipped) => {
        setCards(prev => prev.map(c => {
            if (c.id !== cardID)
                return c;
            return {...c, isFlipped};
        }));
    }
    const setCardCanFlip = (cardID, canFlip) => {
        setCards(prev => prev.map(c => {
            if (c.id !== cardID)
                return c;
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
        console.log('on success')

        setMatchedCards([...matchedCards, [firstCard, secondCard]])

        setCardCanFlip(firstCard.id, false);
        setCardIsFlipped(firstCard.id, false);

        setCardCanFlip(secondCard.id, false);
        setCardIsFlipped(secondCard.id, false);


        resetFirstAndSecondCards();

    }
    const onFailureGuess = () => {
        console.log('on failure')
        const firstCardID = firstCard.id;
        const secondCardID = secondCard.id;

        setTimeout(() => {
            setCardIsFlipped(firstCardID, true);
        }, 1000);
        setTimeout(() => {
            setCardIsFlipped(secondCardID, true);
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

        setCardIsFlipped(card.id, false);

        (firstCard) ? setSecondCard(card) : setFirstCard(card);
    }


    const initialize = () =>{
        setTimeout(() => {
            let index = 0;
            for (const card of cards) {
                setTimeout(() => setCardIsFlipped(card.id, true), index++ * 100);
            }
            setTimeout(() => setCanFlip(true), cards.length * 100);
        }, 3000);
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
               {/*<div className="size">*/}
               {/*    <label htmlFor="sizeSelect">Size: </label>*/}
               {/*    <select onChange={e=>setSize(e.target.value * 2)} name="" id="sizeSelect">*/}
               {/*        <option value="6">6</option>*/}
               {/*        <option value="7">7</option>*/}
               {/*        <option value="8">8</option>*/}
               {/*        <option value="9">9</option>*/}
               {/*    </select>*/}
               {/*</div>*/}
               <div className="result">
                   {
                       start ? `You found ${matchedCards.length} out of ${size / 2 } pairs with ${tries} tries  ` : "Find All The Pairs"
                   }
               </div>

                {/*<div className="restart">*/}
                {/*    <button onClick={()=>restart()}>Restart</button>*/}
                {/*</div>*/}
            </div>
            <div className="playground">

                {cards.map(card => <Card onClick={() => onCardClick(card)} key={card.id} {...card}/>)}
            </div>
        </div>)

}


export default GamePlayGround
