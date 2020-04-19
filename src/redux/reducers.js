import { combineReducers} from 'redux'
import CreateStore from './createStore'
import rootSaga from './sagas'


import memory from './memory/reducer'


/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  memory
})

export default () => {
    let { store } = CreateStore(reducers, rootSaga)
    return store
}
