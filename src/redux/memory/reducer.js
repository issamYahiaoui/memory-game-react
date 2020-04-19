import actions from './actions'
import { generatePlayGroundCards } from '../../data/cards'

const initialState = {
    loading:false,
    error:'',
    cards : generatePlayGroundCards(),
    round : 0,
    guess1 : null,
    guess2 : null,
    size : 18
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
