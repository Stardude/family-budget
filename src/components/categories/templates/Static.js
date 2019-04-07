import React from 'react';
import { connect } from 'react-redux';

import { startDeleteCategory } from '../../../actions/categories';

const Static = (props) => (
    <div className="list-item">
        <div className="list-item__section size-40">
            <span>{props.name}</span>
        </div>
        <div className="list-item__section size-30"></div>
        <div className="list-item__section size-30 align-right">
            <button className="button" onClick={props.onEdit}>Edit</button>
            <button className="button" onClick={e => props.deleteCategory(props.id)}>Remove</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    deleteCategory: id => dispatch(startDeleteCategory(id))
});

export default connect(null, mapDispatchToProps)(Static);
