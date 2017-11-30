import {INSERT_NEW_TRANSACTION, SET_TRANSACTION_LIST} from '../actions/actionTypes'
const initialState = []

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case INSERT_NEW_TRANSACTION:
            return [...state, action.data];
        case SET_TRANSACTION_LIST:
            return action.data ? action.data : []
        default: return state;
    }
}