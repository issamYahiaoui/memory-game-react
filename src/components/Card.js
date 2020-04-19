import React from "react";


export default function Card({imageURL, isFlipped, canFlip,onClick}) {
    return  <div className={"card" + (!isFlipped ? ' opened' : '') + (!canFlip ? ' matched' : '')} onClick={onClick}>
        <div className="front">
            ?
        </div>
        <div className="back">
            <img alt="" src={imageURL}/>
        </div>
    </div>;
}
