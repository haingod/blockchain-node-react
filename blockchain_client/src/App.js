import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import 'antd/dist/antd.css';
import 'font-awesome/css/font-awesome.min.css';
import requireAuth from './utils/requireAuth'
import Layout1 from './components/Layouts/Layout1'
import Layout2 from './components/Layouts/Layout2'
import Login from './components/Settings/Login/Login'
import SignUp from './components/Settings/Signup/Signup'
import Verify from './components/Settings/Verify/Verify'
import Dashboard from './components/Settings/Dashboard/Dashboard'
import TransactionList from './components/Transactions/Transactions-list/transactions-list'
const Layout2Authorized = requireAuth(Layout2);

class App extends Component {
    generateLayout = (props, Layout, Component) => (<Layout {...props}><Component {...props}/></Layout>)
    render() {
    return (
        <Switch>
            <Route exact path="/" render={(props) => this.generateLayout(props,Layout2Authorized,Dashboard)}/>
            <Route exact path="/transaction" render={(props) => this.generateLayout(props,Layout2Authorized,TransactionList)}/>
            <Route exact path="/login" render={(props) => this.generateLayout(props,Layout1,Login)}/>
            <Route exact path="/signup" render={(props) => this.generateLayout(props,Layout1,SignUp)}/>
            <Route exact path="/user/verify/:token" render={(props) => this.generateLayout(props,Layout1,Verify)}/>
            <Redirect to="/"/>
        </Switch>
    );
  }
}

export default App;
