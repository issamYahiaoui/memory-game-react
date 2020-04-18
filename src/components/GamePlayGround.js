import React, {useState} from 'react'
import { generatePlayGroundCards} from "../utils";
import Card from "./Card";


const  GamePlayGround = ({cardImages,size}) => {

    const onCardClick = (card)=> {
      // click callback
    }

    const [cards, setCards] = useState(generatePlayGroundCards(size,cardImages));
    console.log('cardImages ...' , cards)
    return (<div className="playground">
        {cards.map(card => <Card onClick={() => onCardClick(card)} key={card.id} {...card}/>)}
    </div>)
}


export default GamePlayGround
