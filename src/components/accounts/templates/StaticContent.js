import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ModalWindow from '../../general/ModalWindow';
import DeleteModalContent from '../../general/DeleteModalContent';
import EditModalContent from "./EditModalContent";
import TransferModalContent from './TransferModalContent';

import { startDeleteAccount, startEditAccount, startGetAccountByName, startTransfer } from '../../../actions/accounts';
import { checkIfValuesExist } from '../../../utils/utils';

class StaticContent extends React.Component {
    state = {
        isDeleteItem: false,
        isEditItem: false,
        isTransfer: false,
        error: undefined
    };

    onDeleteSubmit = e => {
        this.props.deleteAccount(this.props.id);
        this.setState({ isDeleteItem: false });
    };

    onEditSubmit = (e, currency) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        let error = undefined;

        if (checkIfValuesExist(name, currency)) {
            this.props.getAccountByName(name).then(account => {
                if (account && account.id !== this.props.id) {
                    error = 'Account already exist';
                    this.setState({ error, isEditItem: true });
                } else {
                    this.props.editAccount(this.props.id, Object.assign({}, this.props, {name, currency}))
                        .then(() => this.setState({ error, isEditItem: false }));
                }
            });
        } else {
            error = 'Invalid account name';
            this.setState({ error, isEditItem: true });
        }
    };

    onTransferSubmit = ({destination, destinationName, amount, rate, total, comment, date}) => {
        const source = this.props.id;
        const sourceName = this.props.name;
        let error = undefined;

        if (checkIfValuesExist(destination, amount, date, rate, total)) {
            this.props.transfer({
                source,
                sourceName,
                destination,
                destinationName,
                amount,
                total,
                comment,
                date
            }).then(() => this.setState({ error, isTransfer: false }))
        } else {
            error = 'Please, complete all fields';
            this.setState({ error, isTransfer: true });
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isDeleteItem: false, isEditItem: false, isTransfer: false, error: undefined });
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
                    <button className="button" onClick={e => this.setState({ isEditItem: true, error: undefined })}>Edit</button>
                    <button className="button" onClick={e => this.setState({ isTransfer: true, error: undefined })}>Transfer</button>
                    <button className="button" onClick={e => this.setState({ isDeleteItem: true })}>Remove</button>
                </div>
                {
                    this.state.isDeleteItem &&
                    <ModalWindow isOpen={this.state.isDeleteItem} onClose={this.onCancel}>
                        <DeleteModalContent onSubmit={this.onDeleteSubmit} onCancel={this.onCancel} >
                            <p>Are you sure you want to delete account<br/>'{this.props.name}' ?</p>
                        </DeleteModalContent>
                    </ModalWindow>
                }
                {
                    this.state.isEditItem &&
                    <ModalWindow isOpen={this.state.isEditItem} onClose={this.onCancel}>
                        <EditModalContent {...this.props} onSubmit={this.onEditSubmit} onCancel={this.onCancel} error={this.state.error} />
                    </ModalWindow>
                }
                {
                    this.state.isTransfer &&
                    <ModalWindow isOpen={this.state.isTransfer} onClose={this.onCancel}>
                        <TransferModalContent source={this.props.name} onSubmit={this.onTransferSubmit} onCancel={this.onCancel} error={this.state.error} />
                    </ModalWindow>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteAccount: (id) => dispatch(startDeleteAccount(id)),
    editAccount: (id, updates) => dispatch(startEditAccount(id, updates)),
    getAccountByName: (name) => dispatch(startGetAccountByName(name)),
    transfer: (parameters) => dispatch(startTransfer(parameters))
});

export default connect(null, mapDispatchToProps)(StaticContent);
