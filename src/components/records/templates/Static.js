import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import { startDeleteRecord } from '../../../actions/records';

const Static = (props) => (
    <div className="list-item">
        <ReactTooltip place="right" type="light" effect="solid"/>
        <div className="list-item__section size-40">
            <span className={props.isIncome === 'true' ? 'arrow-up' : 'arrow-down'}> </span>
            <span data-tip={props.comment}> {props.name}</span>
        </div>
        <div className="list-item__section size-15">
            <span>{moment(props.recordDate).format('DD-MMM-YYYY')}</span>
        </div>
        <div className="list-item__section size-15">
            <span>{props.price} {props.currency}</span>
        </div>
        <div className="list-item__section size-10">
            <span>x{props.amount}</span>
        </div>
        <div className="list-item__section size-20 align-right">
            <button className="button" onClick={props.onEdit}>Edit</button>
            <button className="button" onClick={e => props.deleteRecord(props.id)}>Remove</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    deleteRecord: id => dispatch(startDeleteRecord(id))
});

export default connect(null, mapDispatchToProps)(Static);
