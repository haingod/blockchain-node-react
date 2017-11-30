import React, {Component} from 'react';
import { Modal, Button, Icon, Form, Select, Input, Col, notification,InputNumber, Alert   } from 'antd';
import {sendCoin} from '../../../actions/transactionActions'
import {setCurrentBitCoin} from '../../../actions/walletActions'
import {connect} from 'react-redux'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;
class SendModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1Visible: false,
            loading: false,
            err: ''
        }
    }
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            err: ''
        })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let that = this
                confirm({
                    title: `Do you want to send ${values.amount} to '${values.address}' address?`,
                    content: 'Click OK to confirm',
                    onOk() {
                        that.setState({
                            loading: true
                        })
                        that.props.sendCoin(values).then(() => {
                            that.props.setCurrentBitCoin(that.props.bitcoinNumber-values.amount)

                            notification['success']({
                                message: 'Success',
                                description: 'You have sent '+values.amount+' to wallet ID: '+values.address+' successfully!',
                                duration: 0,
                            });
                            that.handleCancel();
                            that.setState({
                                loading: false
                            })
                        }, res => {
                            that.setState({
                                loading: false,
                                err : res.response.data.error
                            })
                        })
                    },
                    onCancel() {
                        that.setState({
                            loading: false
                        })
                    },
                });
            }
        });
    }
    handleCancel = (e) => {
        this.setState({
            modal1Visible: false,
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const alert = this.state.err ? (<Alert message={(<p>{this.state.err}</p>)} type="error" style={{marginBottom:'10px'}}/>) : ''
        return (
            <div>
                <Button type="default" icon="upload"  size="large"
                        onClick={() => this.setModal1Visible(true)}>Send</Button>

                <Modal
                    title={(<h2> <Icon type="upload"/> Send Bitcoin</h2>)}
                    style={{ top: 20 }}
                    visible={this.state.modal1Visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="Currency:">
                            <Select defaultValue="btc" style={{ width: 120 }}>
                                <Option value="btc"><i className="fa fa-btc bitcoin-icon" aria-hidden="true"></i> BITCOIN</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="To:">
                            {getFieldDecorator('address', {
                                rules: [{ required: true, message: 'Please input address!'}],
                            })(
                                <Input placeholder="Paste address"/>
                            )}
                        </FormItem>

                            {alert}

                        <FormItem label="Amount:">
                            {getFieldDecorator('amount', {
                                rules: [{ required: true, message: 'Please input amount!'}],
                            })(
                                <InputNumber
                                    style={{width:'50%'}}
                                    min={1} max={this.props.bitcoinNumber}
                                />
                            )}
                            <i className="fa fa-btc bitcoin-icon" aria-hidden="true"></i>

                        </FormItem>
                        <FormItem label="Description">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Please input description!'}],
                            })(
                                <TextArea placeholder="Money for rent" autosize={{ minRows: 2, maxRows: 6 }} />
                            )}

                        </FormItem>
                        <Button type="primary"
                                htmlType="submit"
                                style={{width:'100%'}}
                                size="large"
                                loading={this.state.loading}
                        >
                            SEND
                        </Button>
                    </Form>
                </Modal>
            </div>
        );
    }
}
const WrappedSendModal = Form.create()(SendModal);
const mapStateToProps = (state) => {
    return {
        bitcoinNumber: state.wallet.bitcoinNumber,
    }
}
export default connect(mapStateToProps, {sendCoin,setCurrentBitCoin})(WrappedSendModal)
