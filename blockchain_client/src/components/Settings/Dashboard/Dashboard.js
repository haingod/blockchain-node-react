import React, {Component} from 'react';
import {connect} from 'react-redux'
import './dashboard.css'
import { Col, Row, Table, Tabs, Icon, Spin } from 'antd';
import { getSendingTransactionOfUser, getReceivingTransactionOfUser } from '../../../actions/transactionActions'
const TabPane = Tabs.TabPane;
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedInfo: null,
            tableLoading: true
        };
        this.props.getSendingTransactionOfUser().then(() => {
            this.setState({
                tableLoading: false
            });
        })
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            sortedInfo: sorter,
        });
    }
    changeTab = (currentTab) => {
        this.setState({
            tableLoading: true
        });
        if(currentTab === '1') {
            this.props.getSendingTransactionOfUser().then(() => {
                this.setState({
                    tableLoading: false
                });
            })
        } else {
            this.props.getReceivingTransactionOfUser().then(() => {
                this.setState({
                    tableLoading: false
                });
            })
        }
    }
    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [{
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => a.time - b.time,
            sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
        }, {
            title: 'To',
            dataIndex: 'receiver',
            key: 'receiver',
            sorter: (a, b) => a.receiver - b.receiver,
            sortOrder: sortedInfo.columnKey === 'receiver' && sortedInfo.order,
        }, {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description - b.description,
            sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
        }];
        const column2s = [{
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => a.time - b.time,
            sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
        }, {
            title: 'From',
            dataIndex: 'sender',
            key: 'sender',
            sorter: (a, b) => a.sender - b.sender,
            sortOrder: sortedInfo.columnKey === 'sender' && sortedInfo.order,
        }, {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description - b.description,
            sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
        }];

        return (
            <Row gutter={16} style={{paddingTop:'10px'}}>
                <Col span={8} >
                    <div className="panel">
                        <h1>YOUR BALANCE</h1>
                        <h1 style={{textAlign:'center', marginTop:'15px'}}>${parseFloat(this.props.bitcoinNumber)*7000}</h1>
                        <div className="line-top-box">
                            <h2 style={{
                                verticalAlign: 'middle',
                                lineHeight: '50px'
                            }}>My Bitcoin Wallet</h2>
                            <div style={{textAlign:"right"}}>
                                <h2>{this.props.bitcoinNumber} BTC</h2>
                                <h3>${parseFloat(this.props.bitcoinNumber)*7000}</h3>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={16} >
                    <div className="panel">
                        <h1>RECENT ACTIVITY</h1>
                        <div style={{marginTop:'15px'}}>
                            <Spin tip="Loading..." spinning={this.state.tableLoading}>
                                <Tabs defaultActiveKey="1" onChange={this.changeTab}>
                                    <TabPane tab={<span><Icon type="upload" />Send Coin</span>} key="1">
                                        <Table
                                            columns={columns}
                                            dataSource={this.props.transList}
                                            onChange={this.handleChange}
                                            pagination = {{total:this.props.transList.length, pageSize: 5}}
                                        />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="download" />Receive Coin</span>} key="2">
                                        <Table
                                            columns={column2s}
                                            dataSource={this.props.transList}
                                            onChange={this.handleChange}
                                            pagination = {{total:this.props.transList.length, pageSize: 5}}
                                        />
                                    </TabPane>
                                </Tabs>
                            </Spin>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        bitcoinNumber: state.wallet.bitcoinNumber,
        transList: state.transList
    }
}
export default connect(mapStateToProps,{getSendingTransactionOfUser, getReceivingTransactionOfUser})(Dashboard)