import React from 'react';
import { connect } from 'react-redux';

import EditModalContent from './templates/Modal';
import ModalWindow from '../general/ModalWindow';

import { startAddRecord } from '../../actions/records';
import { checkIfValuesExist } from '../../utils/utils';

class NewRecord extends React.Component {
    state = {
        isAddNewListItem: this.props.isAddNewListItem || false
    };

    onSubmit = (e, categoryId, date) => {
        e.preventDefault();
        const price = e.target.price.value.trim();
        const amount = e.target.amount.value.trim();
        const comment = e.target.comment.value.trim();
        const isIncome = e.target.isIncome.checked;
        const accountId = this.props.accountId;

        if (checkIfValuesExist(categoryId, date, price, amount, accountId)) {
            this.props.addRecord({categoryId, date, price, amount, comment, accountId, isIncome}).then(() => {
                this.setState({ isAddNewListItem: false });
            });
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isAddNewListItem: false });
        }
    };

    onAddNewListItem = () => {
        this.setState({ isAddNewListItem: true })
    };

    render() {
        return (
            <div className="list-item__section">
                <button className="button" onClick={this.onAddNewListItem}>Add New Record</button>
                {this.state.isAddNewListItem &&
                <ModalWindow isOpen={this.state.isAddNewListItem} onClose={this.onCancel}>
                    <EditModalContent onSubmit={this.onSubmit} onCancel={this.onCancel} />
                </ModalWindow>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRecord: record => dispatch(startAddRecord(record))
});

export default connect(null, mapDispatchToProps)(NewRecord);
