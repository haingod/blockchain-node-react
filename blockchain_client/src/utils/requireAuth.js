import React,{Component} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
export  default  function (BaseComponent) {
    class AuthorizeComponent extends Component {
        render() {
            const auth = this.props.auth;
            return auth.isAuthenticated ? (<BaseComponent {...this.props} />) : (<Redirect to="/login"/>)
        }
    }
    const mapStateToProps = (state) => {
        return {
            auth: state.auth
        }
    }

    return connect(mapStateToProps)(AuthorizeComponent);
}
