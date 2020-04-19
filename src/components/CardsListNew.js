import React from  'react'
import Card from "./Card";


const CardsListNew = ({cards})=> {

    return (
        <div>
            <div className="playground">
                {cards.map(card => <Card
                    onClick={() => console.log('clicked card ', card)}
                    key={card.id}
                    {...card}
                />)}
            </div>
        </div>)
}


export default CardsListNew
