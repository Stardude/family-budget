import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ModalWindow from '../../general/ModalWindow';
import DeleteModalContent from '../../general/DeleteModalContent';

import { startDeleteAccount } from '../../../actions/accounts';

class StaticContent extends React.Component {
    state = {
        deleteId: null
    };

    onSubmit = e => {
        this.props.deleteAccount(this.state.deleteId);
        this.setState({ deleteId: null });
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ deleteId: null });
        }
    };

    render () {
        return (
            <div className="list-item">
                <Link to={`/accounts/${this.props.id}`} className="list-item__section size-40">
                    <span>{this.props.name}</span>
                </Link>
                <div className="list-item__section size-30">
                    <span>{this.props.balance + ' ' + this.props.currency}</span>
                </div>
                <div className="list-item__section size-30 align-right">
                    <Link className="button" to={`/accounts/${this.props.id}?newRecord=true`}>Add</Link>
                    <button className="button" onClick={this.props.onEdit}>Edit</button>
                    <button className="button">Transfer</button>
                    <button className="button" onClick={e => this.setState({ deleteId: this.props.id })}>Remove</button>
                </div>
                {this.state.deleteId &&
                <ModalWindow isOpen={!!this.state.deleteId} onClose={this.onCancel}>
                    <DeleteModalContent onSubmit={this.onSubmit} onCancel={this.onCancel} >
                        <p>Are you sure you want to delete account<br/>'{this.props.name}' ?</p>
                    </DeleteModalContent>
                </ModalWindow>}
            </div>
        );
    }   
}

const mapDispatchToProps = (dispatch) => ({
    deleteAccount: id => dispatch(startDeleteAccount(id))
});

export default connect(null, mapDispatchToProps)(StaticContent);
