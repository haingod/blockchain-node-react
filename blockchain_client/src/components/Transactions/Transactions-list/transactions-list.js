import React, {Component} from 'react';
import {connect} from 'react-redux'
import './transactions-list.css'
import { Table } from 'antd';
import { getAllTransaction } from '../../../actions/transactionActions'

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null
        };
        this.props.getAllTransaction()
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => a.time - b.time,
            sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
        }, {
            title: 'Sender ID',
            dataIndex: 'sender',
            key: 'sender',
            sorter: (a, b) => a.sender - b.sender,
            sortOrder: sortedInfo.columnKey === 'sender' && sortedInfo.order,
        }, {
            title: 'Receiver ID',
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

        return (
            <div >
                <div className="panel">
                    <h1>ALL TRANSACTIONS</h1>
                    <div style={{marginTop:'15px'}}>
                        <Table
                            columns={columns}
                            dataSource={this.props.transList}
                            onChange={this.handleChange}
                            pagination = {{total:this.props.transList.length, pageSize: 5}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        transList: state.transList
    }
}
export default connect(mapStateToProps,{getAllTransaction})(TransactionList)