import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './AppContainer';
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducers from './rootReducer'
import registerServiceWorker from './registerServiceWorker';
import setAuthorizationToken from './utils/setAuthorizationToken'
import {setCurrentUser} from "./actions/authActions";
import jwt from 'jsonwebtoken'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';


const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken)
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <LocaleProvider locale={enUS}>
               <AppContainer/>
            </LocaleProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
