import { combineReducers } from 'redux'
import rootreducer from './rootreducer';

const allReducer = combineReducers({
    storeData : rootreducer
})

export default allReducer