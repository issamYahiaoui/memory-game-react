import React from "react";
import Image from "./CardImage";

export default function Card({imageURL, isFlipped, canFlip,onClick}) {
    return  <div className={"card" + (!isFlipped ? ' opened' : '') + (!canFlip ? ' matched' : '')} onClick={onClick}>
        <div className="front">
            ?
        </div>
        <div className="back">
            <Image src={imageURL}/>
        </div>
    </div>;
}
