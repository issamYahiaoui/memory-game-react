import React from  'react'
import Card from "./Card";


const CardsListNew = ({cards, flip})=> {

    return (
        <div>
            <div className="playground">
                {cards.map(card => <Card
                    onClick={()=>flip(card)}
                    key={card.id}
                    {...card}
                />)}
            </div>
        </div>)
}


export default CardsListNew
