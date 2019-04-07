import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startDeleteAccount } from '../../../actions/accounts';

const Static = (props) => (
    <div className="list-item">
        <Link to={`/accounts/${props.id}`} className="list-item__section size-40">
            <span>{props.name}</span>
        </Link>
        <div className="list-item__section size-30">
            <span>{props.balance + ' ' + props.currency}</span>
        </div>
        <div className="list-item__section size-30 align-right">
            <Link className="button" to={`/accounts/${props.id}?newRecord=true`}>Add</Link>
            <button className="button" onClick={props.onEdit}>Edit</button>
            <button className="button">Transfer</button>
            <button className="button" onClick={e => props.deleteAccount(props.id)}>Remove</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    deleteAccount: id => dispatch(startDeleteAccount(id))
});

export default connect(null, mapDispatchToProps)(Static);
