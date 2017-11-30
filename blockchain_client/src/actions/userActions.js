import axios from 'axios';
import {API_URL} from '../config'

export function SignUp(userData) {

    return axios({
        method:'post',
        url:API_URL+'/user/register',
        data:userData
    })

}