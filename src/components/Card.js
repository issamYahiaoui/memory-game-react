import React from "react";
import Image from "./CardImage";

export default function Card({imageURL, close, complete}) {
    return  <div className={"card" + (!close ? ' opened' : '') + (complete ? ' matched' : '')}>
        <div className="front">
            ?
        </div>
        <div className="back">
            <Image src={imageURL}/>
        </div>
    </div>;
}
