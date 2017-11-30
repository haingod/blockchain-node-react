
import {combineReducers} from 'redux'
import authReducer from './reducers/authReducer'
import walletReducer from './reducers/walletReducer'
import transactionReducer from './reducers/transactionReducer'
export default combineReducers(
    {
        auth: authReducer,
        wallet: walletReducer,
        transList: transactionReducer
    }
)