import React, {Component} from 'react';
import {Layout, Button } from 'antd';
import {connect} from 'react-redux'
import {logout} from '../../actions/authActions'
import {Link} from 'react-router-dom';
const Header = Layout.Header

class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    goTo(route) {
        console.log(route)
        this.props.history.replace(`${route}`)
    }
    logOut = (e) => {
        e.preventDefault()
        this.props.logout()
    }
    render() {
        return (
            <Header className="header">
                <Link className="logo" to="/">
                    <h2>BLOCKCHAIN</h2>
                </Link>
                <a href="#" style={{position: 'absolute',right: '30px',color: 'white',
                    fontSize: '15px'}} onClick={this.logOut}>Log Out</a>

            </Header>
        );
    }
}

export default connect(null,{logout})(NavBar)