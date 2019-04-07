import React from 'react';
import { connect } from 'react-redux';

import { startAddAccount, startGetAccountByName } from '../../actions/accounts';
import { checkIfValuesExist } from '../../utils/utils';

import EditModalContent from './templates/EditModalContent';
import ModalWindow from '../general/ModalWindow';

class NewAccount extends React.Component {
    state = {
        error: undefined,
        isAddNewListItem: false
    };

    onSubmit = (e, currency) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        let error = undefined;

        if (checkIfValuesExist(name, currency)) {
            this.props.getAccountByName(name)
                .then(account => {
                    if (account) {
                        error = 'Account already exists';
                        this.setState({ error, isAddNewListItem: true });
                    } else {
                        this.props.addAccount({name, currency})
                            .then(() => this.setState({ error, isAddNewListItem: false }));
                    }
                });
        } else {
            error = 'Invalid account name';
            this.setState({ error, isAddNewListItem: true });
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isAddNewListItem: false, error: undefined });
        }
    };

    onAddNewListItem = () => {
        this.setState({ isAddNewListItem: true, error: undefined });
    };

    render() {
        return (
            <div className="list-item__section">
                <button className="button" onClick={this.onAddNewListItem}>Add New Account</button>
                {this.state.isAddNewListItem &&
                    <ModalWindow isOpen={this.state.isAddNewListItem} onClose={this.onCancel}>
                        <EditModalContent onSubmit={this.onSubmit} onCancel={this.onCancel} error={this.state.error} />
                    </ModalWindow>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAccountByName: (accountName) => dispatch(startGetAccountByName(accountName)),
    addAccount: name => dispatch(startAddAccount(name))
});

export default connect(null, mapDispatchToProps)(NewAccount);
