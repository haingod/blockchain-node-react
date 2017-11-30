import axios from 'axios';
import {API_URL} from '../config'
import {SET_CURRENT_USER} from './actionTypes'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}
export function login(data) {
    return dispatch => {
        return axios.post(API_URL + '/user/login', data).then(res => {
            const token = res.data;
            localStorage.setItem('jwtToken', token)
            setAuthorizationToken(token)
            dispatch(setCurrentUser(jwt.decode(token)));
        })
    }
}

export function verify(token) {
    return axios.get(API_URL + '/user/verify/' + token)
}