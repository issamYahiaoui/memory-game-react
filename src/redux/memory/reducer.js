import actions from './actions'

const initialState = {
    loading:false,
    error:'',
    cards : [],
    round : 0,
    guess1 : null,
    guess2 : null,
    try : 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
