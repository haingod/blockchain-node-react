import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Form, Icon, Input, Button, Checkbox,message} from 'antd';
import {connect} from 'react-redux'
import './signup.css'
import {SignUp} from '../../../actions/userActions'

const FormItem = Form.Item;

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            message: '',
            success: ''
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
                    loading: true
                })
                console.log('Received values of form: ', values);
                SignUp(values).then(res => {
                    console.log(res)
                    this.setState({
                        message: res.data.message,
                        success: res.data.success,
                        loading: false
                    })
                })
            }
        });
    }

    componentWillMount(){
        if (localStorage.access_token) {
            this.goTo('/')
        }
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const message = this.state.message;
        const success = this.state.success;
        return (
            <div>
                <h1 className="title">BLOCKCHAIN</h1>
                <Form onSubmit={this.handleSubmit} className="signup-form">
                    <Row className="form-title">
                        <h2>Create your new wallet</h2>
                    </Row>
                    <FormItem label="Email">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' },
                                {
                                    type: 'email', message: 'The input is not valid E-mail!',
                                }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <h3 style={{color: 'red'}}>{message}</h3>
                    <FormItem label="Password">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' },
                                { min: 6, message: 'Password at least 6 characters' }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem label="Confirm Password">
                        {getFieldDecorator('password2', {
                            rules: [
                                { required: true, message: 'Please repeat your Password!' },
                                { validator: this.checkPassword,},
                                { min: 6, message: 'Password at least 6 characters' }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit"
                                className="signup-form-button"
                                loading={this.state.loading}
                        >
                            Sign Up
                        </Button>
                        Or <Link to="/login">Log In</Link>
                    </FormItem>
                    <h3 style={{color: 'green'}}>{success}</h3>
                </Form>
            </div>

        );
    }
}


const WrappedSignupPageForm = Form.create()(SignupPage);

const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, {})(WrappedSignupPageForm)