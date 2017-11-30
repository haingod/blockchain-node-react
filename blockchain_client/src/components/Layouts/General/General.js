import React, {Component} from 'react';
import {Row, Col } from 'antd';
import SendModal from './SendModal'
import ReceiveModal from './ReceiveModel'
import {connect} from 'react-redux'
import {getUserWallet} from '../../../actions/walletActions'
import './general.css'

class General extends Component {
    constructor(props) {
        super(props);
        this.props.getUserWallet()
        this.state = {
            dollar: 0
        }
    }
    render() {
        return (
            <div className="general">
                <Row>
                    <Col span={12}>
                        <h1>BE YOUR OWN BANK</h1>
                        <div className="buttons">
                            <SendModal style={{marginRight:'10px'}}/>
                            <ReceiveModal/>
                        </div>
                    </Col>
                    <Col span={12} style={{textAlign:'right'}}>
                        <div><h1>{this.props.bitcoinNumber} BTC </h1></div>
                        <div><h1>${parseFloat(this.props.bitcoinNumber)*7000} </h1></div>
                    </Col>
                </Row>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        bitcoinNumber: state.wallet.bitcoinNumber
    }
}
export default connect(mapStateToProps,{getUserWallet})(General)