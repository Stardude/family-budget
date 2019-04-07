import React from 'react';
import Modal from 'react-modal';

class ModalWindow extends React.Component {
    render () {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onClose}
                className="modal"
                ariaHideApp={false}
            >
                {
                    this.props.children
                }
            </Modal>
        );
    }
}

export default ModalWindow;
