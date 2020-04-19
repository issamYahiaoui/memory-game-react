
import { all, takeEvery, select, put, call } from 'redux-saga/effects'
import actions from "./actions";
import { initialState } from './reducer'
import { generatePlayGroundCards } from '../../data/cards'



export const getMemory = (state) => state.memory

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const flipAllCards =(prevCards,isFlipped) => prevCards.map(card => {return {...card, isFlipped}})
const flipCard =(prevCards,cardID,isFlipped) => {
    return prevCards.map(card => {
        if (card.id !== cardID)
            return card;
        return {...card, isFlipped};
    })
}

const getCardsAfterSuccess = (prevCards,guess1,guess2) => {
    return prevCards.map(card => {
        return (card.id !== guess1.id && card.id !== guess2.id ) ? card : {...card,canFlip: false,isFlipped : false}
    })
}

const getCardsAfterFailure = (prevCards,guess1,guess2) => {
    return prevCards.map(card => {
        return (card.id !== guess1.id && card.id !== guess2.id ) ? card : {...card,isFlipped : false}
    })
}

















function* INITIALIZE(){
    console.info('INITIALIZE begin')
    const {size} = yield select(getMemory)
    // generate cards
    const cards = generatePlayGroundCards(size)
    yield put({
        type: 'memory/SET_STATE',
        payload: {
            cards
        },
    })
    yield delay(3000)
    // flip all cards
    yield put({
        type: 'memory/SET_STATE',
        payload: {
            cards : [...flipAllCards(cards,true)],
            canFlip : true
        },
    })
    console.info('INITIALIZE end')

}

function* RESTART(){
    console.info('RESTART begin')

    yield put({
        type: 'memory/SET_STATE',
        payload: initialState,
    })
    // reinitialize
    yield call(INITIALIZE)
    console.info('RESTART end')
}


function* FLIP_CARD({payload : {card}}){
    console.info('FLIP_CARD begin')

    const memoryState   = yield select(getMemory)
    const {canFlip, guess1, guess2, cards, round, matchedCards,startGame, tries, size} = memoryState
    let newState = {round : round +1 }

    //we can not flip yet
    if(!canFlip || !card.canFlip )
        return;

    //click on same flipped card
    if ((guess1 && (card.id === guess1.id) || (guess2 && (card.id === guess2.id))))
        return;



    if(round % 2 === 1){
        // first guess
        if (!startGame) newState = { ...newState, startGame : true}

        yield put({
            type: 'memory/SET_STATE',
            payload: {
                ...newState,
                cards : [...flipCard(cards,card.id,false)],
                guess1: card,
            },
        })


    }else{

        newState = { ...newState, tries : tries+1}
        console.log('round', newState.tries)

        //second guess
        if(card.imageURL === guess1.imageURL){
            // successful guess
            yield put({
                type: 'memory/SET_STATE',
                payload: {
                    ...newState,
                    cards : [...getCardsAfterSuccess(cards,guess1,card)],
                    guess1:null,
                    guess2:null,
                    matchedCards : [...matchedCards , [guess1,card]],
                    endGame : (size/2 === matchedCards.length + 1)
                },
            })
        }else{
            //failure guess
            yield put({
                type: 'memory/SET_STATE',
                payload: {
                    ...newState,
                    cards : [...getCardsAfterFailure(cards,guess1,card)],
                    guess1 : null,
                    guess2 : null,
                    canFlip : false
                },
            })
            yield delay(1000)
            yield put({
                type: 'memory/SET_STATE',
                payload: {
                    cards : [...flipAllCards(cards,true)],
                    canFlip :true
                },
            })

        }
    }







    console.info('FLIP_CARD end')
}

export default function* rootSaga(api) {
    yield all([
        takeEvery(actions.INITIALIZE, INITIALIZE),
        takeEvery(actions.RESTART, RESTART),
        takeEvery(actions.FLIP_CARD, FLIP_CARD),

    ])
}
