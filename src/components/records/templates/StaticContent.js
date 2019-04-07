import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import ModalWindow from "../../general/ModalWindow";
import DeleteModalContent from "../../general/DeleteModalContent";

import { startDeleteRecord } from '../../../actions/records';

class StaticContent extends React.Component {
    state = {
        deleteId: null
    };

    onSubmit = e => {
        this.props.deleteRecord(this.state.deleteId);
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
                    <button className="button" onClick={this.props.onEdit}>Edit</button>
                    <button className="button" onClick={e => this.setState({ deleteId: this.props.id })}>Remove</button>
                </div>
                {this.state.deleteId &&
                <ModalWindow isOpen={!!this.state.deleteId} onClose={this.onCancel}>
                    <DeleteModalContent onSubmit={this.onSubmit} onCancel={this.onCancel} >
                        <p>
                            Are you sure you want to delete record
                            <br/>'{this.props.name}' ({moment(this.props.recordDate).format('DD-MMM-YYYY')}) ?
                        </p>
                    </DeleteModalContent>
                </ModalWindow>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteRecord: id => dispatch(startDeleteRecord(id))
});

export default connect(null, mapDispatchToProps)(StaticContent);
