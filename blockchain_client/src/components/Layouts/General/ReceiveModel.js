import { Modal, Button } from 'antd';
import React, {Component} from 'react';
class ReceiveModel extends React.Component {
    state = {
        modal1Visible: false
    }
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }
    render() {
        return (
            <div>
                <Button type="default" icon="download"  size="large"
                        onClick={() => this.setModal1Visible(true)}>Request</Button>
                <Modal
                    title="20px to Top"
                    style={{ top: 20 }}
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setModal1Visible(false)}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </div>
        );
    }
}
export default ReceiveModel
