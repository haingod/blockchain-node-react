
import axios from 'axios';
import {API_URL} from '../config'
import {INSERT_NEW_TRANSACTION, SET_TRANSACTION_LIST} from './actionTypes'

export function insertNewTransaction(trans) {
    return {
        type: INSERT_NEW_TRANSACTION,
        data: trans
    };
}
export function setTransactionList(transList) {
    return {
        type: SET_TRANSACTION_LIST,
        data: transList
    };
}
export function sendCoin(data) {
    return dispatch => {
        return axios.post(API_URL+'/user',data).then(res => {
            dispatch(insertNewTransaction(res.data))
        });
    }
}
export function getSendingTransactionOfUser() {
    return dispatch => {
        return axios.get(API_URL+'/user/transaction/send').then( res => {
            dispatch(setTransactionList(res.data))
        })
    }
}
export function getReceivingTransactionOfUser() {
    return dispatch => {
        return axios.get(API_URL+'/user/transaction/receive').then( res => {
            dispatch(setTransactionList(res.data))
        })
    }
}
export function getAllTransaction() {
    return dispatch => {
        return axios.get(API_URL+'/transaction').then( res => {
            console.log(res.data)
            dispatch(setTransactionList(res.data))
        })
    }
}