import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {verify} from '../../../actions/authActions'
import './verify.css'
import { Spin, Button } from 'antd';
class VerifyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading : true
        }
        verify(props.match.params.token).then(() => {
            this.setState({
                loading: false
            })
        }, err => {
            this.setState({
                error: true,
                loading: false
            })
        })
    }
    goTo = (route) => {
        this.props.history.replace(`${route}`)
    }
    render() {
        const message = this.state.error ? (<h3>Account Not Found. Verification Failed</h3>) : <h3>Account Verified</h3>
        return (
            <div>
                <Spin tip="Loading..." spinning={this.state.loading}>
                    <h1 className="title">BLOCKCHAIN</h1>
                    <div className="verify-content">
                        {message}
                        <Button
                            type="default" onClick={() => this.goTo('/login')}
                            style={{marginTop:"15px"}}
                        >Go to login</Button>
                    </div>
                </Spin>
            </div>

        );
    }
}
export default (VerifyPage)