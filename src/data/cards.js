import uuid from 'react-uuid';
import deepcopy from "deepcopy";

const shuffleArray =(array)=>{
    return array.sort(() => .5 - Math.random());
}
export const generatePlayGroundCards = (count, cardImages)=> {

    if (count % 2 !== 0)
        throw "Count must pair. but it is " + count;

    const cards = shuffleArray(cardImages)
        .slice(0, count / 2)
        .map(imageURL => ({
            id: uuid(),
            imageURL: "images/cards/" + imageURL,
            isFlipped: false,
            canFlip: true
        }))
        .flatMap(e => [e, {...deepcopy(e), id: uuid()}]);

    return shuffleArray(cards);
}
