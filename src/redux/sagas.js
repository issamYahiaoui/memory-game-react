import {  all } from 'redux-saga/effects'



import memory from './memory/sagas'






/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
    yield all([memory()])
}
