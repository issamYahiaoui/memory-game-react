
export const getMemory = (state) => state.memory

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export const flipAllCards =(prevCards,isFlipped) => prevCards.map(card => {return {...card, isFlipped}})
export const flipCard =(prevCards,cardID,isFlipped) => {
    return prevCards.map(card => {
        if (card.id !== cardID)
            return card;
        return {...card, isFlipped};
    })
}
export const getCardsAfterSuccess = (prevCards,guess1,guess2) => {
    return prevCards.map(card => {
        return (card.id !== guess1.id && card.id !== guess2.id ) ? card : {...card,canFlip: false,isFlipped : false}
    })
}

export const getCardsAfterFailure = (prevCards,guess1,guess2) => {
    return prevCards.map(card => {
        return (card.id !== guess1.id && card.id !== guess2.id ) ? card : {...card,isFlipped : false}
    })
}
