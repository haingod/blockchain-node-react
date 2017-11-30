import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Form, Icon, Input, Button, Alert} from 'antd';
import {connect} from 'react-redux'
import {login} from '../../../actions/authActions'
import './login.css'


const FormItem = Form.Item;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            err: ''
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true,
                    err: false
                })
                console.log('Received values of form: ', values);
                this.props.login(values).then(res => {
                    if(localStorage.jwtToken) {
                        console.log(localStorage.jwtToken)
                        this.props.history.replace(`/`)
                    }
                }, err => {
                    this.setState({
                        loading: false,
                        err: err.response.data.error
                    })
                })
            }
        });
    }

    componentWillMount(){
        if (localStorage.jwtToken) {
            this.goTo('/')
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const alert = this.state.err ? (<Alert message={(<p>{this.state.err}</p>)} type="error" style={{marginBottom:'10px', color:'black', fontSize:'16px'}}/>) : ''
        return (
            <div>
                <h1 className="title">BLOCKCHAIN</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Row className="form-title">
                        {alert}
                        <h2>Login</h2>
                    </Row>
                    <FormItem>
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: 'Please input your wallet ID !' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Wallet ID" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/signup">Sign Up</Link>
                    </FormItem>
                </Form>
            </div>

        );
    }
}

const WrappedLoginForm = Form.create()(LoginPage);
export default connect(null,{login})(WrappedLoginForm)