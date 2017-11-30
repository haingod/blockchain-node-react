import {SET_CURRENT_BITCOIN_NUMBER} from './actionTypes'
import {logout} from '../actions/authActions'
import axios from 'axios';
import {API_URL} from '../config'
export function setCurrentBitCoin(bitcoinNumber) {
    return {
        type: SET_CURRENT_BITCOIN_NUMBER,
        bitcoinNumber
    };
}
export function getUserWallet() {
    return dispatch => {
        return axios.get(API_URL+'/user').then(res => {
            console.log(res)
            dispatch(setCurrentBitCoin(res.data.coin))
        }).catch(err => {
            dispatch(logout())
        })
    }
}

