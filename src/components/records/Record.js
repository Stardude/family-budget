import React from 'react';
import { connect } from 'react-redux';

import Static from './templates/StaticContent';
import Edit from './templates/Edit';

import { startEditRecord } from '../../actions/records';
import { checkIfValuesExist } from '../../utils/utils';

class Record extends React.Component {
    state = {
        isEditRecord: false
    };

    onSubmit = (e, categoryId, date) => {
        e.preventDefault();
        const price = e.target.price.value.trim();
        const amount = e.target.amount.value.trim();
        const comment = e.target.comment.value.trim();
        const isIncome = e.target.isIncome.checked;
        const accountId = this.props.accountId;

        if (checkIfValuesExist(categoryId, date, price, amount, accountId)) {
            this.props.editRecord(this.props.id, {categoryId, date, price, amount, comment, accountId, isIncome}).then(() => {
                this.setState({ isEditRecord: false });
            });
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isEditRecord: false, error: undefined });
        }
    };

    onEdit = () => {
        this.setState({ isEditRecord: true, error: undefined });
    };

    render() {
        if (this.state.isEditRecord) {
            return (
                <Edit {...this.props} onSubmit={this.onSubmit} onCancel={this.onCancel} />
            );
        } else {
            return (
                <Static {...this.props} onEdit={this.onEdit} />
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    editRecord: (id, updates) => dispatch(startEditRecord(id, updates))
});

export default connect(null, mapDispatchToProps)(Record);
