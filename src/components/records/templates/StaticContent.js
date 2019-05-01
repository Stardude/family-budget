import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import ModalWindow from "../../general/ModalWindow";
import DeleteModalContent from "../../general/DeleteModalContent";
import EditModalContent from "./EditModalContent";

import { startDeleteRecord, startEditRecord } from '../../../actions/records';
import { checkIfValuesExist } from "../../../utils/utils";

class StaticContent extends React.Component {
    state = {
        isDeleteItem: false,
        isEditItem: false
    };

    onDeleteSubmit = e => {
        this.props.deleteRecord(this.props.id);
        this.setState({ isDeleteItem: false });
    };

    onEditSubmit = (e, categoryId, date) => {
        e.preventDefault();
        const price = e.target.price.value.trim();
        const amount = e.target.amount.value.trim();
        const comment = e.target.comment.value.trim();
        const isIncome = e.target.isIncome.checked;
        const accountId = this.props.accountId;

        if (checkIfValuesExist(categoryId, date, price, amount, accountId)) {
            this.props.editRecord(this.props.id, {categoryId, date, price, amount, comment, accountId, isIncome}).then(() => {
                this.setState({ isEditItem: false });
            });
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isDeleteItem: false, isEditItem: false });
        }
    };

    render () {
        return (
            <div className="list-item">
                <ReactTooltip place="right" type="light" effect="solid"/>
                <div className="list-item__section size-40">
                    <span className={this.props.isIncome === 'true' ? 'arrow-up' : 'arrow-down'}> </span>
                    <span data-tip={this.props.comment}> {this.props.name}</span>
                </div>
                <div className="list-item__section size-15">
                    <span>{moment(this.props.recordDate).format('DD-MMM-YYYY')}</span>
                </div>
                <div className="list-item__section size-15">
                    <span>{this.props.price} {this.props.currency}</span>
                </div>
                <div className="list-item__section size-10">
                    <span>x{this.props.amount}</span>
                </div>
                <div className="list-item__section size-20 align-right">
                    <button className="button" onClick={e => this.setState({ isEditItem: true })}>Edit</button>
                    <button className="button" onClick={e => this.setState({ isDeleteItem: true })}>Remove</button>
                </div>
                {
                    this.state.isDeleteItem &&
                    <ModalWindow isOpen={this.state.isDeleteItem} onClose={this.onCancel}>
                        <DeleteModalContent onSubmit={this.onDeleteSubmit} onCancel={this.onCancel} >
                            <p>
                                Are you sure you want to delete record
                                <br/>'{this.props.name}' ({moment(this.props.recordDate).format('DD-MMM-YYYY')}) ?
                            </p>
                        </DeleteModalContent>
                    </ModalWindow>
                }
                {
                    this.state.isEditItem &&
                    <ModalWindow isOpen={this.state.isEditItem} onClose={this.onCancel}>
                        <EditModalContent {...this.props} onSubmit={this.onEditSubmit} onCancel={this.onCancel} />
                    </ModalWindow>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteRecord: (id) => dispatch(startDeleteRecord(id)),
    editRecord: (id, updates) => dispatch(startEditRecord(id, updates))
});

export default connect(null, mapDispatchToProps)(StaticContent);
