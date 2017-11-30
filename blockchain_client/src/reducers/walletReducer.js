import {SET_CURRENT_BITCOIN_NUMBER} from '../actions/actionTypes'
const initialState = {
    bitcoinNumber: 0
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_CURRENT_BITCOIN_NUMBER:
            return {
                bitcoinNumber: action.bitcoinNumber
            };
        default: return state;
    }
}