import React from  'react'
import Card from "./Card";


const CardsListNew = ({cards, flip, size})=> {

    const getScaleFromSize = (size)=>{
        console.log('size', size)


        return 3
    }

    return (
        <div>
            <div className="playground"  >
                {cards.map(card => <Card
                    width={25}
                    onClick={()=>flip(card)}
                    key={card.id}
                    {...card}
                />)}
            </div>
        </div>)
}


export default CardsListNew
