import React from 'react';
import { connect } from 'react-redux';

import Edit from './templates/Edit';
import Static from './templates/StaticContent';

import { startEditAccount, startGetAccountByName } from '../../actions/accounts';
import { checkIfValuesExist } from "../../utils/utils";

class Account extends React.Component {
    state = {
        error: undefined,
        isEditAccount: false
    };

    onSubmit = (e, currency) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        let error = undefined;

        if (checkIfValuesExist(name, currency)) {
            this.props.getAccountByName(name).then(account => {
                if (account && account.id !== this.props.id) {
                    error = 'Account already exist';
                    this.setState({ error, isEditAccount: true });
                } else {
                    this.props.editAccount(this.props.id, Object.assign({}, this.props, {name, currency}))
                        .then(() => this.setState({ error, isEditAccount: false }));
                }
            });
        } else {
            error = 'Invalid account name';
            this.setState({ error, isEditAccount: true });
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isEditAccount: false, error: undefined });
        }
    };

    onEdit = () => {
        this.setState(({ isEditAccount: true, error: undefined }));
    };

    render() {
        if (this.state.isEditAccount) {
            return (
                <Edit {...this.props} error={this.state.error} onSubmit={this.onSubmit} onCancel={this.onCancel} />
            );
        } else {
            return (
                <Static {...this.props} onEdit={this.onEdit} />
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    editAccount: (id, updates) => dispatch(startEditAccount(id, updates)),
    getAccountByName: (name) => dispatch(startGetAccountByName(name))
});

export default connect(null, mapDispatchToProps)(Account);
