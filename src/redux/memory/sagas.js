
import { all, takeEvery, select, put, call } from 'redux-saga/effects'
import actions from "./actions";
import { initialState } from './reducer'
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

export default function* rootSaga(api) {
    yield all([
        takeEvery(actions.INITIALIZE, INITIALIZE),
        takeEvery(actions.RESTART, RESTART),

    ])
}
