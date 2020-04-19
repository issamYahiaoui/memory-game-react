
import { all, takeEvery, select, put } from 'redux-saga/effects'
import actions from "./actions";
import { generatePlayGroundCards } from '../../data/cards'



export const getMemory = (state) => state.memory

const delay = (ms) => new Promise(res => setTimeout(res, ms))
const flipAllCards =(prevCards,isFlipped) => prevCards.map(card => {return {...card, isFlipped}})


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
            cards : [...flipAllCards(cards,true)]
        },
    })
    console.info('INITIALIZE end')

}

export default function* rootSaga(api) {
    yield all([
        takeEvery(actions.INITIALIZE, INITIALIZE),

    ])
}
